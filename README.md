# Todo K8s (minimal)

A minimal Todo app (React frontend, Node/Express + Mongoose backend, MongoDB) packaged with Docker and deployed to a local Kubernetes cluster (Minikube).

This repo shows:
- Full file contents for frontend and backend
- Dockerfiles and exact `docker` and `kubectl` commands (with placeholders)
- Kubernetes YAML (Deployments, Services, PVC, ConfigMap, Secret)
- Verification commands and debugging tips

## Quick overview

- Frontend served as static SPA (React + Vite)
- Backend exposes REST API at `/api/todos`
- MongoDB uses a PersistentVolumeClaim (PVC)
- ConfigMap = non-sensitive config; Secret = sensitive values (e.g., DB password)

## Requirements (assumed)
- node & npm
- docker (or `podman` compatible)
- minikube
- kubectl

## Placeholders you must replace
- `DOCKERHUB_USERNAME` — replace with your Docker Hub username when building/tagging/pushing

## Local workflow commands (high-level)
1. Build images (local): `docker build -t DOCKERHUB_USERNAME/todo-backend:0.1 ./backend`
2. Push images: `docker push DOCKERHUB_USERNAME/todo-backend:0.1`
3. Start minikube: `minikube start`
4. Apply k8s manifests: `kubectl apply -f k8s/`
5. Access the frontend (Minikube IP or port-forward)

See the sections below for exact commands and details.