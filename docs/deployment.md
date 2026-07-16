# Deployment Guide

## Frontend — Vercel

1. Connect the repository and set **Root Directory** to `frontend`.
2. Framework preset: **Next.js**.
3. Environment variables:

   | Variable               | Description                    |
   | ---------------------- | ------------------------------ |
   | `NEXT_PUBLIC_API_URL`  | Railway backend URL + `/api/v1` |
   | `NEXT_PUBLIC_APP_URL`  | Vercel deployment URL          |

4. Deploy on push to `main`.

## Backend — Railway

1. Create a new service with **Root Directory** set to `backend`.
2. Build: Docker (uses `backend/Dockerfile`) or Nixpacks with Maven.
3. Environment variables:

   | Variable                    | Description                          |
   | --------------------------- | ------------------------------------ |
   | `SPRING_PROFILES_ACTIVE`    | `prod`                               |
   | `SPRING_DATASOURCE_URL`     | Supabase PostgreSQL JDBC URL         |
   | `SPRING_DATASOURCE_USERNAME`| Supabase DB user                     |
   | `SPRING_DATASOURCE_PASSWORD`| Supabase DB password                 |
   | `JWT_SECRET`                | Strong random secret (256+ bits)     |
   | `JWT_EXPIRATION_MS`         | Token TTL in milliseconds            |

4. Expose port `8080`.

## Database — Supabase

1. Create a Supabase project.
2. Run migrations from `database/migrations/` via Supabase SQL editor or CI.
3. Enable connection pooling (PgBouncer) for Railway if needed.
4. Restrict network access to Railway egress IPs where possible.

## Docker (Local / CI)

```bash
docker compose up --build
```

Production images are built from `backend/Dockerfile`. Frontend is deployed via Vercel (no container required).

## Health Checks

- Backend: `GET /actuator/health` (when actuator is enabled)
- Database: `pg_isready` via Docker healthcheck

## Security Checklist

- [ ] Rotate JWT secret per environment
- [ ] HTTPS only in production
- [ ] CORS restricted to frontend origin
- [ ] Database credentials in secrets manager / platform env vars only
- [ ] No `.env` files committed to version control
