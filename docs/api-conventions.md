# API Conventions

Base URL: `/api/v1`

## Request / Response Format

- Content-Type: `application/json`
- Dates: ISO-8601 (`2026-07-15T10:30:00Z`)
- UUIDs for entity identifiers

## Authentication

```
Authorization: Bearer <jwt_token>
```

## Standard Response Envelope (Lists)

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}
```

## Error Response Envelope

```json
{
  "timestamp": "2026-07-15T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/appointments",
  "errors": [
    {
      "field": "scheduledAt",
      "message": "must not be null"
    }
  ]
}
```

## HTTP Status Codes

| Code | Usage                              |
| ---- | ---------------------------------- |
| 200  | Success (GET, PUT, PATCH)          |
| 201  | Created (POST)                     |
| 204  | No content (DELETE)                |
| 400  | Validation / bad request           |
| 401  | Unauthenticated                    |
| 403  | Forbidden (insufficient role)      |
| 404  | Resource not found                 |
| 409  | Conflict (duplicate, state error)  |
| 500  | Internal server error              |

## Pagination

```
GET /api/v1/resources?page=0&size=20&sort=createdAt,desc
```

## Search & Filtering

```
GET /api/v1/patients?search=john&status=ACTIVE
```

Query parameter names are camelCase and documented per endpoint when modules are implemented.

## Versioning

Breaking changes require a new API version prefix (`/api/v2`). Non-breaking additions stay within `/api/v1`.
