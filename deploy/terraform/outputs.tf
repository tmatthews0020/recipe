output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "acr_login_server" {
  description = "ACR login server hostname for docker push"
  value       = azurerm_container_registry.main.login_server
}

output "aks_cluster_name" {
  description = "AKS cluster name for az aks get-credentials"
  value       = azurerm_kubernetes_cluster.main.name
}

output "postgres_fqdn" {
  description = "FQDN of the PostgreSQL Flexible Server"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

# Use this value for database.connectionString in the Helm chart:
#   helm install recipe-api ./helm/recipe-api \
#     --set database.connectionString="$(terraform output -raw postgres_connection_string)"
output "postgres_connection_string" {
  description = "Full connection string for the Recipe API Helm chart"
  value       = "Host=${azurerm_postgresql_flexible_server.main.fqdn};Database=RecipeDb;Username=${var.postgres_admin_username};Password=${var.postgres_admin_password};Ssl Mode=Require"
  sensitive   = true
}
