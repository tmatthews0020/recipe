# Tilt Development Setup

This guide will help you set up and use Tilt for local development of the Recipe API.

## Prerequisites

1. **Docker Desktop** or **Podman** - Container runtime
2. **kubectl** - Kubernetes CLI tool
3. **Tilt** - Install via:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash
   ```
4. **Local Kubernetes Cluster** - Choose one:
   - **kind** (Kubernetes in Docker) - Recommended
     ```bash
     # Install kind
     curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
     chmod +x ./kind
     sudo mv ./kind /usr/local/bin/kind
     
     # Create a cluster
     kind create cluster --name recipe-dev
     ```
   - **minikube**
     ```bash
     minikube start
     ```
   - **Docker Desktop Kubernetes** (Enable in settings)

## Getting Started

1. **Verify Kubernetes is Running**
   ```bash
   kubectl cluster-info
   ```

2. **Update Tiltfile Context** (if needed)
   
   Open `Tiltfile` and update the context name on line 4 if you're not using the default context:
   ```python
   allow_k8s_contexts('your-context-name')
   ```
   
   To see your current context:
   ```bash
   kubectl config current-context
   ```

3. **Start Tilt**
   ```bash
   tilt up
   ```
   
   This will:
   - Build the Docker image for the Recipe API
   - Deploy PostgreSQL to your local Kubernetes cluster
   - Deploy the Recipe API
   - Set up port forwarding
   - Watch for file changes and auto-reload

4. **Access the Tilt UI**
   
   Tilt will automatically open a browser to `http://localhost:10350` where you can:
   - See the status of all services
   - View logs in real-time
   - Monitor resource usage
   - See build and deployment progress

5. **Access Your Application**
   - **API Swagger UI**: http://localhost:5000/swagger
   - **API Endpoint**: http://localhost:5000/api
   - **PostgreSQL**: localhost:5432

## Development Workflow

### Making Changes

When you edit C# files in the `RecipeApi/` directory, Tilt will:
1. Sync the changed files to the container
2. Rebuild the application
3. Restart the container
4. Show you the logs

### Running Database Migrations

You have two options:

**Option 1: From your local machine** (requires .NET SDK)
```bash
cd RecipeApi
dotnet ef database update
```

**Option 2: Inside the container**
```bash
# Get the pod name
kubectl get pods -n recipe

# Execute migration in the pod
kubectl exec -n recipe -it <recipe-api-pod-name> -- dotnet ef database update
```

### Viewing Logs

**In Tilt UI:**
- Click on any resource to see its logs
- Logs auto-update in real-time

**Via kubectl:**
```bash
# API logs
kubectl logs -n recipe -l app=recipe-api -f

# PostgreSQL logs
kubectl logs -n recipe -l app=postgres -f
```

### Connecting to PostgreSQL

```bash
# Port forward (if not already done by Tilt)
kubectl port-forward -n recipe svc/postgres 5432:5432

# Connect with psql
psql -h localhost -U postgres -d RecipeDb
# Password: postgres
```

## Tilt Commands

- **Start Tilt**: `tilt up`
- **Start Tilt in Terminal** (no browser): `tilt up --stream`
- **Stop Tilt**: Press `Ctrl+C` or `Space` then `q` in the UI
- **Tear Down Resources**: `tilt down`
- **View Tilt Logs**: `tilt logs`
- **Trigger Manual Update**: `tilt trigger <resource-name>`

## Troubleshooting

### Container Won't Start

1. Check logs in Tilt UI
2. Verify the Docker image built successfully
3. Check resource limits:
   ```bash
   kubectl describe pod -n recipe <pod-name>
   ```

### Database Connection Issues

1. Verify PostgreSQL is running:
   ```bash
   kubectl get pods -n recipe
   ```
2. Check the connection string in `k8s/recipe-api.yaml`
3. Ensure the database has been initialized with migrations

### Tilt Won't Start

1. Verify Kubernetes context:
   ```bash
   kubectl config current-context
   ```
2. Update the `allow_k8s_contexts()` in Tiltfile
3. Check if the cluster is running:
   ```bash
   kubectl cluster-info
   ```

### Clean Slate

To completely reset everything:
```bash
# Stop Tilt
tilt down

# Delete the namespace (removes all resources)
kubectl delete namespace recipe

# Restart Tilt
tilt up
```

## Tips and Tricks

1. **Use the Tilt UI** - It's much easier than watching terminal logs
2. **Label your resources** - Resources are already labeled as 'backend' and 'database' in the Tiltfile
3. **Enable live_update** - Already configured for faster development iterations
4. **Use triggers** - Control when builds happen in the Tilt UI
5. **Check resource dependencies** - PostgreSQL starts before the API automatically

## Next Steps

- Customize the `Tiltfile` for your specific needs
- Add more resources (Redis, message queues, etc.)
- Configure different environments (dev, staging)
- Add custom buttons to the Tilt UI for common tasks
- Set up remote debugging

## Additional Resources

- [Tilt Documentation](https://docs.tilt.dev/)
- [Tilt Best Practices](https://docs.tilt.dev/tutorial/3-tilt-up.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
