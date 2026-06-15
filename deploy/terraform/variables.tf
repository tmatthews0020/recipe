variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "East US 2"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "recipe-api-rg"
}

variable "project_name" {
  description = "Short prefix used for all resource names (lowercase alphanumeric)"
  type        = string
  default     = "recipeapi"
}

variable "postgres_admin_username" {
  description = "Administrator username for the PostgreSQL server"
  type        = string
  default     = "recipeadmin"
}

variable "postgres_admin_password" {
  description = "Administrator password for the PostgreSQL server"
  type        = string
  sensitive   = true
}

variable "aks_node_count" {
  description = "Number of nodes in the AKS default node pool"
  type        = number
  default     = 2
}

variable "aks_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_D2s_v3"
}

variable "image_tag" {
  description = "Docker image tag to deploy via Helm"
  type        = string
  default     = "latest"
}

variable "postgres_sku_name" {
  description = "SKU for the PostgreSQL Flexible Server (B_Standard_B1ms for dev, GP_Standard_D2s_v3 for prod)"
  type        = string
  default     = "B_Standard_B1ms"
}

variable "postgres_version" {
  description = "PostgreSQL major version"
  type        = string
  default     = "16"
}

variable "postgres_storage_mb" {
  description = "Storage in MB (minimum 32768)"
  type        = number
  default     = 32768
}

variable "postgres_backup_retention_days" {
  description = "Backup retention in days (7–35)"
  type        = number
  default     = 7
}
