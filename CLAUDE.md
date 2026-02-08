# Evolution of Todo - Phase II Context

## Commands
- **Backend Run**: `cd backend && uv run uvicorn src.main:app --reload`
- **Backend Test**: `cd backend && uv run pytest`
- **Frontend Run**: `cd frontend && npm run dev`
- **Frontend Test**: `cd frontend && npm run test`

## Architecture
- **Specs**: `specs/` (Source of Truth)
- **Frontend**: Next.js App Router (Port 3000)
- **Backend**: FastAPI (Port 8000)
- **Database**: Neon Postgres (SQLModel)
- **Auth**: Better Auth (Client) + JWT (Backend)
