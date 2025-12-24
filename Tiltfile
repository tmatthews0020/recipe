# -*- mode: Python -*-

# Allow Kubernetes contexts (update this to match your local cluster)
allow_k8s_contexts('kind-kind')

# Load Kubernetes manifests
k8s_yaml([
    'k8s/namespace.yaml',
    'k8s/postgres-config.yaml',
    'k8s/postgres.yaml',
    'k8s/recipe-api.yaml',
])

# Build the Recipe API Docker image
docker_build(
    'recipe-api',
    '.',
    dockerfile='Dockerfile',
)

# Set up port forwarding for the API
k8s_resource(
    'recipe-api',
    port_forwards='5000:5000',
    labels=['backend'],
)

# Set up PostgreSQL
k8s_resource(
    'postgres',
    port_forwards='5432:5432',
    labels=['database'],
)

# Set resource ordering - postgres should be ready before recipe-api
k8s_resource(
    'recipe-api',
    resource_deps=['postgres'],
)
