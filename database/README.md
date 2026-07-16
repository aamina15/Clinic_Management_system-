# Database

PostgreSQL schema management for the Smart Clinic Management System.

## Directory Layout

```
database/
├── init/           # Docker entrypoint scripts (run once on fresh container)
├── migrations/     # Versioned SQL migrations (Flyway-compatible)
└── seeds/          # Development seed data (non-production)
```

## Local Development

PostgreSQL is provisioned via Docker Compose:

```bash
docker compose up -d postgres
```

Connection defaults (see root `.env.example`):

| Variable          | Default              |
| ----------------- | -------------------- |
| `POSTGRES_DB`     | `clinic_management`  |
| `POSTGRES_USER`   | `clinic_user`        |
| `POSTGRES_PORT`   | `5432`               |

## Production (Supabase)

- Create a Supabase project and enable PostgreSQL.
- Apply migrations from `migrations/` in order.
- Configure `SPRING_DATASOURCE_URL` in Railway with the Supabase connection string.

## Migration Conventions

- File naming: `V{version}__{description}.sql` (e.g. `V1__create_users_table.sql`)
- One logical change per migration file.
- Never modify applied migrations; add new versions instead.
