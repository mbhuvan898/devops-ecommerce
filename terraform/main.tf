# The resource group is the container every other Azure resource lives in.
# Deleting it deletes everything — handy for tearing down a learning setup:
#   terraform destroy
resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-rg"
  location = var.location
  tags     = var.tags
}
