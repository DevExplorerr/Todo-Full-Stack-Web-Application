# Research: Full-Stack Todo Monorepo

## 1. Authentication Integration (Better Auth + FastAPI)

**Problem**: Better Auth is a client-side authentication library for Next.js. The backend (FastAPI) needs to trust and verify requests made by the frontend.

**Decision**:
- Frontend: Use `better-auth` client library to handle login/signup and token storage.
- Backend: Implement a JWT Verification Middleware.
  - The Frontend sends the JWT in the `Authorization` header (`Bearer <token>`).
  - The Backend verifies the token signature using the shared `BETTER_AUTH_SECRET`.
  - Backend is *stateless* - it does not query a session table for every request, relying on the signed JWT validation.

**Rationale**:
- Fits the "Stateless Security" constitution principle.
- Decouples the backend from the specific auth provider implementation details, relying only on standard JWTs.

**Alternatives Considered**:
- *Session-based Auth (Server-side)*: Rejected because the Constitution explicitly mandates "Stateless Security" and "No server-side sessions" on the backend.
- *API Key Auth*: Not suitable for user-based actions.

## 2. Database Integration (Neon + SQLModel)

**Problem**: Connecting to Neon Serverless Postgres from FastAPI using SQLModel (SQLAlchemy).

**Decision**:
- Use `asyncpg` driver for asynchronous database access.
- Use `SQLModel` with `AsyncEngine`.
- Configure `pool_size` and `max_overflow` appropriately for a serverless environment (or rely on Neon's connection pooling if available/configured).
- *Strictness*: Use Alembic (auto-generated from SQLModel) for schema migrations to ensure the DB matches the code.

**Rationale**:
- SQLModel is the mandated ORM.
- `asyncpg` is the standard high-performance async driver for Postgres in Python.

**Alternatives Considered**:
- *Psycopg2*: Synchronous, not ideal for high-concurrency FastAPI apps.
