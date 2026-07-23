# Amazon DocumentDB (MongoDB-compatible) — a managed, Mongo-compatible
# database, so the services keep using Mongoose unchanged.
#
# ONE cluster, FOUR databases created by the app itself on first connect —
# the "database per service" pattern: each microservice gets its own
# MONGO_URI pointing at a different db name on the same cluster endpoint.
#
# TLS is disabled here. DocumentDB defaults to requiring TLS with Amazon's
# RDS CA bundle, which the services' plain `mongoose.connect(MONGO_URI)`
# isn't set up to trust. Since this cluster is only reachable from inside
# the VPC (see the security group below — no public subnet, no 0.0.0.0/0
# ingress), disabling TLS is an acceptable trade-off for a learning project.
# In production, re-enable TLS and load the CA bundle in database.js instead.

resource "aws_docdb_subnet_group" "main" {
  name       = "${local.name}-docdb-subnets"
  subnet_ids = aws_subnet.private[*].id
  tags       = var.tags
}

resource "aws_docdb_cluster_parameter_group" "main" {
  name        = "${local.name}-docdb-params"
  family      = "docdb5.0"
  description = "Disables TLS to match the app's plain mongodb:// connection string"

  parameter {
    name  = "tls"
    value = "disabled"
  }
}

# Security group: only the EKS node group's security group may reach
# port 27017 — nothing else in the VPC, and nothing from the internet.
resource "aws_security_group" "docdb" {
  name_prefix = "${local.name}-docdb-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    security_groups = [aws_eks_cluster.main.vpc_config[0].cluster_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_docdb_cluster" "main" {
  cluster_identifier              = "${local.name}-docdb"
  engine                          = "docdb"
  master_username                 = var.docdb_master_username
  master_password                 = var.docdb_master_password
  db_subnet_group_name            = aws_docdb_subnet_group.main.name
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.main.name
  vpc_security_group_ids          = [aws_security_group.docdb.id]

  # Learning project: skip the final snapshot on destroy so
  # `terraform destroy` doesn't hang waiting for a snapshot, and doesn't
  # leave a snapshot around racking up storage charges after teardown.
  skip_final_snapshot = true

  tags = var.tags
}

# Single instance — no read replica. Keeps cost down; not HA.
resource "aws_docdb_cluster_instance" "main" {
  identifier         = "${local.name}-docdb-0"
  cluster_identifier = aws_docdb_cluster.main.id
  instance_class     = var.docdb_instance_class
  tags               = var.tags
}
