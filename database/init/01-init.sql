-- Initial database setup (runs on first Docker container start)
-- Business schema migrations live in database/migrations/ and are applied via Flyway.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Placeholder: Flyway will manage schema versioning from backend/src/main/resources/db/migration/
