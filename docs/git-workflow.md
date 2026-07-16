# Git Workflow

## Branch Strategy

| Branch    | Purpose                              |
| --------- | ------------------------------------ |
| `main`    | Production-ready releases            |
| `develop` | Integration branch for features      |
| `feature/*` | New features and modules           |
| `fix/*`   | Bug fixes                            |
| `release/*` | Release preparation                |

## Commit Message Format

```
<type>(<scope>): <subject>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(auth): add JWT login endpoint`
- `fix(appointments): correct timezone handling`

## Pull Request Checklist

- [ ] No secrets or `.env` files committed
- [ ] Lint and type-check pass (frontend)
- [ ] Tests pass (backend)
- [ ] Documentation updated if needed
