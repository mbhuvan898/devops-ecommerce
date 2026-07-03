# Pins Terraform and provider versions so `terraform init` is reproducible.
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
}

# The Azure provider. Authentication comes from `az login`
# (or a service principal in CI).
provider "azurerm" {
  features {}
}
