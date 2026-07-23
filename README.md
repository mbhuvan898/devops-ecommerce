# Best2Buy — Microservices on AWS (EKS + Terraform)

E-commerce app split from a monolith into four decentralized services,
deployable locally with Docker Compose or to Amazon EKS with
Terraform-provisioned infrastructure.

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
                                     (one DB per service — DocumentDB on AWS)
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
k8s/                Kubernetes manifests for EKS (numbered in apply order)
terraform/          AWS infrastructure: VPC, ECR, EKS, DocumentDB
backend/            the original monolith (kept for reference; delete when confident)
docker-compose.yml  local dev stack
```

## Run locally

```bash
cp .env.example .env        # optional — defaults work for a basic boot
docker compose up --build
# → http://localhost:8080
```

## Deploy to AWS

### 1. Provision infrastructure (Terraform)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # set a real docdb_master_password
aws configure           # or use an existing named profile / SSO login
terraform init           # downloads the aws provider
terraform plan            # preview what will be created — read this, it's the best way to learn
terraform apply           # ~12-15 min (EKS control plane + node group take a while)
```

Creates: a VPC (public + private subnets across 2 AZs, IGW, single NAT
Gateway), 5 ECR repositories (one per service + frontend), an EKS cluster
with a 2-node managed node group (`t3.medium`), and a DocumentDB cluster
(Mongo-compatible, TLS disabled, 1 instance) with the node group's security
group as the only thing allowed to reach it.

### 2. Build and push images

```bash
REGION=$(terraform -chdir=terraform output -raw aws_region)
REGISTRY=$(terraform -chdir=terraform output -json ecr_repository_urls | jq -r '."user-service"' | cut -d/ -f1)
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REGISTRY

for s in user-service product-service order-service payment-service; do
  URL=$(terraform -chdir=terraform output -json ecr_repository_urls | jq -r ".\"$s\"")
  docker build -t $URL:v1 services/$s
  docker push $URL:v1
done
FRONTEND_URL=$(terraform -chdir=terraform output -json ecr_repository_urls | jq -r '."frontend"')
docker build -t $FRONTEND_URL:v1 frontend
docker push $FRONTEND_URL:v1
```

### 3. Deploy to EKS

```bash
aws eks update-kubeconfig \
  --name $(terraform -chdir=terraform output -raw eks_cluster_name) \
  --region $(terraform -chdir=terraform output -raw aws_region)

# Point the manifests at your registry (all 5 repo URLs share the same account/region prefix)
sed -i "s#REGISTRY#$REGISTRY#g" k8s/*.yaml

# Secrets: copy the example, paste the DocumentDB endpoint from
#   terraform -chdir=terraform output docdb_endpoint
# into the four MONGO_URI_* values (insert the db name before the "?").
cp k8s/02-secrets.example.yaml k8s/02-secrets.yaml   # then edit it

kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-configmap.yaml
kubectl apply -f k8s/02-secrets.yaml
kubectl apply -f k8s/

kubectl get pods -n ecommerce                 # wait for Running
kubectl get svc frontend -n ecommerce         # EXTERNAL-IP (an ELB hostname) = your app URL
```

Put that ELB hostname into `FRONTEND_URL` in `k8s/01-configmap.yaml`,
re-apply it, and restart the pods (`kubectl rollout restart deploy -n ecommerce`).

### Tear down (stop paying)

```bash
terraform -chdir=terraform destroy
```

## Learning pointers

- **Terraform**: each `.tf` file is commented. Start with `main.tf` → `vpc.tf` → `ecr.tf` → `eks.tf` → `docdb.tf`. `terraform plan` before every apply.
- **Kubernetes**: `k8s/10-user-service.yaml` is commented as the reference — Deployment vs Service, probes, ConfigMap/Secret injection.
- **Next steps to explore**: an Ingress controller (AWS Load Balancer Controller) instead of the LoadBalancer Service, a message queue (SQS/RabbitMQ) for stock events instead of the synchronous internal HTTP calls, HorizontalPodAutoscaler, CI/CD with Jenkins/GitHub Actions + SonarQube + Trivy scanning before the image push step.
