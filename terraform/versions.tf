# Pins Terraform and provider versions so `terraform init` is reproducible.
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
  }
}

# Authentication comes from `aws configure` (or an IAM role / OIDC in CI).
provider "aws" {
  region = var.aws_region
}
