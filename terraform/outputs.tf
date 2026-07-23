# Outputs = values you need after `terraform apply`.
# Show them any time with:  terraform output   (add -raw for scripts)

output "eks_cluster_name" {
  description = "Pass to: aws eks update-kubeconfig --name <this> --region <aws_region>"
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.main.endpoint
}

output "ecr_repository_urls" {
  description = "Map of service name -> ECR repository URL. Use to tag/push images and in the k8s manifests."
  value       = { for k, v in aws_ecr_repository.services : k => v.repository_url }
}

output "docdb_endpoint" {
  description = "DocumentDB cluster endpoint. Insert the database name (users/products/orders/payments) before the ? in each service's MONGO_URI."
  value       = aws_docdb_cluster.main.endpoint
  sensitive   = true
}

output "aws_region" {
  value = var.aws_region
}

output "github_actions_role_arn" {
  description = "Paste into the GitHub repo secret AWS_ROLE_ARN — the workflow assumes this via OIDC, no static keys needed."
  value       = aws_iam_role.github_actions.arn
}
