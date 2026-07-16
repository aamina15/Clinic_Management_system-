# Development Guide

## Environment Setup

1. Install Node.js 20+, Java 21, Maven 3.9+.
2. Copy environment templates:
   - Root: `.env.example` → `.env`
   - Frontend: `frontend/.env.example` → `frontend/.env.local`
   - Backend: `backend/.env.example` → `backend/.env`
3. Start PostgreSQL: `docker compose up -d postgres`

## Running Services

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Profiles: `dev` (default), `prod`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Code Conventions

### Frontend (TypeScript)

- Strict TypeScript enabled
- Path alias: `@/*` → `src/*`
- Components: PascalCase files, colocated types when small
- Services: one file per domain resource
- No business logic in page components — delegate to hooks/services

### Backend (Java)

- Package base: `com.clinic.management`
- DTOs for all API input/output — never expose entities directly
- Services are `@Transactional` at appropriate boundaries
- Use `@Valid` on request DTOs with Jakarta Bean Validation

## Git Workflow

- `main` — production-ready
- `develop` — integration branch
- Feature branches: `feature/<module>-<description>`

## Useful Commands

```bash
# Full stack via Docker
docker compose up --build

# Backend tests
cd backend && ./mvnw test

# Frontend lint
cd frontend && npm run lint

# Frontend type check
cd frontend && npm run type-check
```

## Adding shadcn/ui Components

```bash
cd frontend
npx shadcn@latest add button
```

Configuration is in `frontend/components.json`.
