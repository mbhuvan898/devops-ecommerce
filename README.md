# Best2Buy — Microservices on Azure (AKS + Terraform)

E-commerce app split from a monolith into four decentralized services,
deployable locally with Docker Compose or to Azure Kubernetes Service
with Terraform-provisioned infrastructure.

## Architecture

```
                                 ┌────────────────────────────────────────────┐
                    /            │  frontend (React build + nginx)            │
 browser ──────────────────────► │  nginx doubles as the API GATEWAY          │
                    /api/v1/*    │  (frontend/nginx.conf routes by path)      │
                                 └───┬──────────┬──────────┬──────────┬───────┘
                                     │          │          │          │
                             user-service  product-svc  order-svc  payment-svc
                                :4001        :4002        :4003       :4004
                                  │            │            │           │
                               users DB    products DB   orders DB  payments DB
                                     (one DB per service — Cosmos DB on Azure)
```

Service-to-service calls (internal, never exposed through the gateway):

| Caller | Callee | Endpoint | Why |
|---|---|---|---|
| order-service | product-service | `PUT /internal/stock/decrement` | reduce stock when an order ships |
| order-service | user-service | `GET /internal/users/:id` | customer name/email on order details |
| user-service | order-service | `GET /internal/orders/count/:userId` | order count on the profile page |

**Auth is stateless:** user-service signs a JWT containing `{ id, name, email, role }`.
Every service verifies it with the shared `JWT_SECRET` — no session store, no
call to user-service on each request. (Existing logins predating the split
lack `role` in the token, so users must log in again once.)

## Repo layout

```
services/           the four microservices (each: own package.json, Dockerfile, .env.example)
frontend/           React app; its nginx.conf is also the API gateway
k8s/                Kubernetes manifests for AKS (numbered in apply order)
terraform/          Azure infrastructure: resource group, ACR, AKS, Cosmos DB
backend/            the original monolith (kept for reference; delete when confident)
docker-compose.yml  local dev stack
```

## Run locally

```bash
cp .env.example .env        # optional — defaults work for a basic boot
docker compose up --build
# → http://localhost:8080
```

## Deploy to Azure

### 1. Provision infrastructure (Terraform)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # pick your own unique prefix
az login
terraform init      # downloads the azurerm provider
terraform plan      # preview what will be created — read this, it's the best way to learn
terraform apply     # ~10 min (AKS takes a while)
```

Creates: resource group, ACR (image registry), AKS (2× Standard_B2s nodes),
Cosmos DB account (Mongo API, serverless) with 4 databases, and the
role assignment letting AKS pull from ACR.

### 2. Build and push images

```bash
ACR=$(terraform -chdir=terraform output -raw acr_login_server)
az acr login --name "${ACR%%.*}"

for s in user-service product-service order-service payment-service; do
  docker build -t $ACR/$s:v1 services/$s
  docker push $ACR/$s:v1
done
docker build -t $ACR/frontend:v1 frontend
docker push $ACR/frontend:v1
```

### 3. Deploy to AKS

```bash
az aks get-credentials \
  -g $(terraform -chdir=terraform output -raw resource_group_name) \
  -n $(terraform -chdir=terraform output -raw aks_cluster_name)

# Point the manifests at your registry
sed -i "s/REGISTRY.azurecr.io/$ACR/g" k8s/*.yaml

# Secrets: copy the example, paste the Cosmos connection string from
#   terraform -chdir=terraform output cosmos_connection_string
# into the four MONGO_URI_* values (insert the db name before the "?").
cp k8s/02-secrets.example.yaml k8s/02-secrets.yaml   # then edit it

kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-secrets.yaml
kubectl apply -f k8s/

kubectl get pods -n ecommerce                 # wait for Running
kubectl get svc frontend -n ecommerce         # EXTERNAL-IP = your app URL
```

Put that external IP into `FRONTEND_URL` in `k8s/01-configmap.yaml`,
re-apply it, and restart the pods (`kubectl rollout restart deploy -n ecommerce`).

### Tear down (stop paying)

```bash
terraform -chdir=terraform destroy
```

## Learning pointers

- **Terraform**: each `.tf` file is commented. Start with `main.tf` → `acr.tf` → `aks.tf` → `cosmosdb.tf`. `terraform plan` before every apply.
- **Kubernetes**: `k8s/10-user-service.yaml` is commented as the reference — Deployment vs Service, probes, ConfigMap/Secret injection.
- **Next steps to explore**: an Ingress controller instead of the LoadBalancer Service, a message queue (RabbitMQ/Service Bus) for stock events instead of the synchronous internal HTTP calls, HorizontalPodAutoscaler, CI/CD with GitHub Actions.
