# Azure Container Registry — where the microservice Docker images live.
# AKS pulls images from here. Name must be globally unique and
# alphanumeric only (no dashes).
resource "azurerm_container_registry" "main" {
  name                = "${var.prefix}acr"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic" # cheapest tier; fine for a single project
  admin_enabled       = false   # AKS authenticates via managed identity instead (see aks.tf)
  tags                = var.tags
}
