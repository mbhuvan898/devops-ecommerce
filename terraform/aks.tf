# Azure Kubernetes Service — the managed cluster the microservices run on.
# Azure manages the control plane (free); you pay only for worker VMs.
resource "azurerm_kubernetes_cluster" "main" {
  name                = "${var.prefix}-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "${var.prefix}-aks"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = var.aks_node_size
  }

  # Managed identity: Azure creates a service identity for the cluster so
  # it can talk to other Azure resources without stored credentials.
  identity {
    type = "SystemAssigned"
  }

  tags = var.tags
}

# Grant the cluster's kubelet identity permission to PULL images from ACR.
# Without this, pods fail with ImagePullBackOff.
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.main.id
  skip_service_principal_aad_check = true
}
