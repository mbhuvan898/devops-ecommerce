# Shared data sources and naming — every other file references these
# instead of hardcoding AZs or repeating the prefix.

data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  azs = slice(data.aws_availability_zones.available.names, 0, var.az_count)
  name = var.prefix
}
