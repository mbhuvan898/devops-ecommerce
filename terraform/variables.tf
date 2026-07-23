# Variables = the knobs of this configuration.
# Set them in terraform.tfvars (copy terraform.tfvars.example).

variable "prefix" {
  description = "Short name prefixed to every resource (letters/numbers/hyphens)."
  type        = string
  default     = "b2becom"
}

variable "aws_region" {
  description = "AWS region for all resources. Mumbai — same region as the S3 product-image bucket, to avoid cross-region data transfer."
  type        = string
  default     = "ap-south-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "az_count" {
  description = "Number of availability zones to spread subnets across."
  type        = number
  default     = 2
}

variable "eks_node_count" {
  description = "Desired number of worker nodes in the EKS managed node group."
  type        = number
  default     = 2
}

variable "eks_node_instance_type" {
  description = "EC2 instance type for EKS worker nodes. t3.medium is the cheapest sensible choice for learning (t3.small is too tight for kubelet + pods)."
  type        = string
  default     = "t3.medium"
}

variable "eks_cluster_version" {
  description = "Kubernetes version for the EKS control plane."
  type        = string
  default     = "1.30"
}

variable "docdb_instance_class" {
  description = "Instance class for the DocumentDB instance. db.t3.medium is the smallest class DocumentDB offers."
  type        = string
  default     = "db.t3.medium"
}

variable "docdb_master_username" {
  description = "Master username for the DocumentDB cluster."
  type        = string
  default     = "b2becomadmin"
}

variable "docdb_master_password" {
  description = "Master password for the DocumentDB cluster. Set this in terraform.tfvars — never commit it."
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags applied to every resource — useful for cost tracking."
  type        = map(string)
  default = {
    project = "devops-ecommerce"
    managed = "terraform"
  }
}
