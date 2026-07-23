# Elastic Container Registry — where the microservice + frontend Docker
# images live. Pulling from ECR is granted via the node IAM role's
# AmazonEC2ContainerRegistryReadOnly policy (see eks.tf), which lets every
# node pull from any ECR repo in this account — no per-repo grant needed.

resource "aws_ecr_repository" "services" {
  for_each             = toset(["user-service", "product-service", "order-service", "payment-service", "frontend"])
  name                 = "${local.name}/${each.key}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = var.tags
}
