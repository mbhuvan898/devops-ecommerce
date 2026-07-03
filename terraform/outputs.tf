# Outputs = values you need after `terraform apply`.
# Show them any time with:  terraform output   (add -raw for scripts)

output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "acr_login_server" {
  description = "Docker registry URL — use it to tag/push images and in the k8s manifests."
  value       = azurerm_container_registry.main.login_server
}

output "aks_cluster_name" {
  description = "Pass to: az aks get-credentials -g <rg> -n <this>"
  value       = azurerm_kubernetes_cluster.main.name
}

output "cosmos_connection_string" {
  description = "Base Mongo connection string. Insert the database name (users/products/orders/payments) before the ? for each service's MONGO_URI."
  value       = azurerm_cosmosdb_account.main.primary_mongodb_connection_string
  sensitive   = true
}
