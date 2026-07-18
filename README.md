# Smart Clinic Management System

A production-ready, scalable clinic management platform with role-based portals for patients, doctors, reception staff, and administrators.

## Tech Stack

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Frontend   | Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui   |
| Backend    | Spring Boot 3, Java 25, Spring Security, JWT, Hibernate |
| Database   | PostgreSQL (Supabase in production)                     |
| Deployment | Vercel (FE) · Railway (BE) · Supabase (DB)              |

## Project Structure

```
├── frontend/          # Next.js application
├── backend/           # Spring Boot REST API
├── database/          # SQL migrations, seeds, and init scripts
├── docs/              # Architecture and operational documentation
├── docker-compose.yml # Local development stack
└── .env.example       # Root environment template
```

## Prerequisites

- **Node.js** 20+
- **Java** 25
- **Maven** 3.9+
- **Docker** & Docker Compose (optional, for local DB + backend)

## Quick Start

### 1. Clone and configure environment

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Edit the copied files with your local credentials.

### 2. Start infrastructure (Docker)

```bash
docker compose up -d postgres
```

### 3. Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

API base URL: `http://localhost:8080/api/v1`

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

App URL: `http://localhost:3000`

## Development

See [docs/development.md](docs/development.md) for detailed setup, conventions, and workflows.

## Architecture

See [docs/architecture.md](docs/architecture.md) for system design, layer responsibilities, and deployment topology.

## Deployment

See [docs/deployment.md](docs/deployment.md) for Vercel, Railway, and Supabase configuration.

## License

Proprietary — All rights reserved.
