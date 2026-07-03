# Variables = the knobs of this configuration.
# Set them in terraform.tfvars (copy terraform.tfvars.example).

variable "prefix" {
  description = "Short name prefixed to every resource (letters/numbers only — ACR and Cosmos names must be globally unique)."
  type        = string
  default     = "b2becom"
}

variable "location" {
  description = "Azure region for all resources."
  type        = string
  default     = "centralindia"
}

variable "aks_node_count" {
  description = "Number of worker VMs in the AKS default node pool."
  type        = number
  default     = 2
}

variable "aks_node_size" {
  description = "VM size for AKS worker nodes. Standard_B2s (2 vCPU / 4 GiB) is the cheapest sensible choice for learning."
  type        = string
  default     = "Standard_B2s"
}

variable "tags" {
  description = "Tags applied to every resource — useful for cost tracking."
  type        = map(string)
  default = {
    project = "devops-ecommerce"
    managed = "terraform"
  }
}
