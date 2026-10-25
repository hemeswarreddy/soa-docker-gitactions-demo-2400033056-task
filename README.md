# StorageUnit Management System - SOA Docker & GitHub Actions Project

**Student ID:** 2400033056  
**Repository:** [https://github.com/hemeswarreddy/soa-docker-gitactions-demo-2400033056-task.git](https://github.com/hemeswarreddy/soa-docker-gitactions-demo-2400033056-task.git)

---

## Repository Structure

```
├── .github/
│   └── workflows/
│       └── docker-build-push.yml   # GitHub Actions workflow for building & pushing Docker images
├── backend/                        # Spring Boot CRUD service source code & Dockerfile
│   ├── Dockerfile                  # Multi-stage Dockerfile (Eclipse Temurin 21 JDK)
│   ├── pom.xml                     # Maven project configuration
│   ├── mvnw & .mvn/                # Maven wrapper
│   └── src/                        # Java source code & application.properties
├── frontend/                       # React (Vite) frontend application source code & Dockerfile
│   ├── Dockerfile                  # Multi-stage Dockerfile (Node 20 Alpine & Nginx Alpine)
│   ├── nginx.conf                  # Nginx configuration for Single Page Application routing
│   ├── package.json                # Frontend dependencies (React, Axios, Bootstrap, Bootstrap Icons)
│   └── src/                        # React components, Context API, and API services
├── docker-compose.yml              # Multi-container orchestration (Frontend, Backend, PostgreSQL)
├── .gitignore                      # Git ignore rules for build artifacts, node_modules, IDE files
└── README.md                       # Project documentation
```

---

## Service Endpoints & Ports

| Service | Internal Port | Host Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | 80 | **3000** / **80** | React UI (StorageUnit CRUD Operations) |
| **Backend** | 8081 | **8081** | Spring Boot REST API (`/storageunit/*`) |
| **PostgreSQL** | 5432 | **5432** | Database (`exam_2400033056`) |

---

## Running with Docker Compose

To start all services (PostgreSQL, Spring Boot Backend, and React Frontend) together:

```bash
docker compose up --build
```

To stop all services:

```bash
docker compose down
```

---

## Building and Running Individually

### 1. Backend Service

```bash
# Build Docker image
docker build -t docker-backend-2400033056:latest ./backend

# Run container
docker run -d -p 8081:8081 --name backend-service docker-backend-2400033056:latest
```

### 2. Frontend Service

```bash
# Build Docker image
docker build -t docker-frontend-2400033056:latest ./frontend

# Run container
docker run -d -p 3000:80 --name frontend-service docker-frontend-2400033056:latest
```

---

## CI/CD: GitHub Actions Workflow

The workflow `.github/workflows/docker-build-push.yml` automatically triggers on:
- Every `push` to `main`
- Every `pull_request` to `main`
- Manual trigger via `workflow_dispatch`

### Workflow Steps:
1. **Checkout Code**: Checks out the repository using `actions/checkout@v4`.
2. **Setup Docker Buildx**: Configures Buildx builder.
3. **Docker Hub Login**: Authenticates securely using repository secrets (`DOCKER_USERNAME` / `DOCKERHUB_USERNAME` and `DOCKER_PASSWORD` / `DOCKERHUB_TOKEN`).
4. **Build Images**: Builds both `docker-backend-2400033056` and `docker-frontend-2400033056`.
5. **Push Images**: Tags with `latest` and `${{ github.sha }}` and pushes both images to Docker Hub.
