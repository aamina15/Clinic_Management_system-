# Smart Clinic Management System — Architecture

## Overview

Monorepo with a **Next.js** frontend and **Spring Boot** REST API backed by **PostgreSQL**. Clean architecture separates concerns across layers with clear dependency rules.

## High-Level Topology

```
┌─────────────┐     HTTPS/JWT      ┌─────────────┐     JDBC      ┌────────────┐
│   Next.js   │ ◄────────────────► │ Spring Boot │ ◄───────────► │ PostgreSQL │
│  (Vercel)   │    REST /api/v1    │  (Railway)  │               │ (Supabase) │
└─────────────┘                    └─────────────┘               └────────────┘
```

## Frontend Layers

| Directory     | Responsibility                                      |
| ------------- | --------------------------------------------------- |
| `app/`        | Routes, layouts, page shells (App Router)           |
| `components/` | Reusable UI (shadcn/ui, layout, domain widgets)     |
| `hooks/`      | Client-side state and data-fetching hooks           |
| `lib/`        | Utilities, constants, API client configuration      |
| `services/`   | HTTP service layer (calls backend REST APIs)        |
| `types/`      | Shared TypeScript interfaces and enums              |

## Backend Layers

| Package       | Responsibility                                      |
| ------------- | --------------------------------------------------- |
| `controller`  | REST endpoints, request/response mapping            |
| `service`     | Business logic and transaction boundaries           |
| `repository`  | Data access (Spring Data JPA)                       |
| `entity`      | JPA domain models                                   |
| `dto`         | Request/response transfer objects                   |
| `config`      | Beans, CORS, OpenAPI, application configuration     |
| `security`    | JWT filter chain, authentication, authorization     |
| `exception`   | Global exception handling and error responses       |

## Dependency Rule

Dependencies flow **inward**: Controllers → Services → Repositories → Entities. DTOs bridge the API boundary; entities never leak to the client.

## Authentication

- JWT issued by Spring Security on login.
- Roles: `PATIENT`, `DOCTOR`, `RECEPTIONIST`, `ADMIN`.
- Frontend stores token securely and attaches `Authorization: Bearer <token>` to API calls.

## API Conventions

- Base path: `/api/v1`
- JSON request/response bodies
- Standard HTTP status codes
- Paginated list endpoints: `?page=0&size=20&sort=createdAt,desc`
- Search/filter via query parameters

See [api-conventions.md](./api-conventions.md) for full REST standards.

## Feature Modules (Planned)

| Module              | Portals Affected              |
| ------------------- | ----------------------------- |
| Appointments        | Patient, Doctor, Reception    |
| Queue Management    | Reception, Doctor             |
| EMR / Records       | Doctor, Patient (read-only)   |
| Billing             | Reception, Admin              |
| Prescriptions       | Doctor, Patient               |
| Lab Reports         | Doctor, Patient               |
| Notifications       | All roles                     |
| Analytics           | Admin                         |

## Future Integrations

AI summarization, voice-to-text, telemedicine, online payments — designed as pluggable service modules behind stable API contracts.
