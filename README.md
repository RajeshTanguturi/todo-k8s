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

