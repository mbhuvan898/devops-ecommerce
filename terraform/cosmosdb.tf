# Cosmos DB with the MongoDB API — a managed, Mongo-compatible database,
# so the services keep using Mongoose unchanged.
#
# ONE account, FOUR databases — the "database per service" pattern:
# each microservice can only reach its own data through its own URI.
resource "azurerm_cosmosdb_account" "main" {
  name                = "${var.prefix}-cosmos"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  offer_type          = "Standard"
  kind                = "MongoDB"

  # Serverless = pay per request instead of a fixed hourly rate.
  # Ideal for a learning/low-traffic project.
  capabilities {
    name = "EnableServerless"
  }
  capabilities {
    name = "EnableMongo"
  }

  mongo_server_version = "4.2"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.main.location
    failover_priority = 0
  }

  tags = var.tags
}

# One database per microservice — decentralized data ownership.
resource "azurerm_cosmosdb_mongo_database" "db" {
  for_each = toset(["users", "products", "orders", "payments"])

  name                = each.key
  resource_group_name = azurerm_resource_group.main.name
  account_name        = azurerm_cosmosdb_account.main.name
}
