# Backend

Spring Boot 3 REST API for the Smart Clinic Management System.

## Requirements

- Java 21
- Maven 3.9+
- PostgreSQL 16+

## Run Locally

```bash
cp .env.example .env
# Export variables or use direnv

./mvnw spring-boot:run
```

API: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui.html`  
Health: `http://localhost:8080/actuator/health`

## Package Structure

```
com.clinic.management
├── controller/     # REST endpoints
├── service/        # Business logic
├── repository/     # Data access
├── entity/         # JPA entities
├── dto/            # Request/response objects
├── config/         # Application configuration
├── security/       # JWT & authorization
└── exception/      # Error handling
```

## Profiles

| Profile | Usage        |
| ------- | ------------ |
| `dev`   | Local development (default) |
| `prod`  | Production deployment     |
| `test`  | Unit/integration tests    |
