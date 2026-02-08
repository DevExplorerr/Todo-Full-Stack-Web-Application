# Quickstart: Full-Stack Todo Monorepo

## Prerequisites
- Node.js 20+
- Python 3.10+
- `uv` (Python package manager)
- `npm` or `pnpm`
- Neon Database URL (Postgres)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   # Create .env file
   cp .env.example .env
   # Update .env with DATABASE_URL and BETTER_AUTH_SECRET
   
   # Install dependencies
   uv pip install -r requirements.txt
   
   # Run migrations (if applicable) or start server (SQLModel can create tables on startup for MVP)
   uv run uvicorn src.main:app --reload
   ```
   Backend runs on `http://localhost:8000`.

3. **Frontend Setup**
   ```bash
   cd frontend
   # Create .env file
   cp .env.example .env.local
   # Update .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000 and BETTER_AUTH_URL
   
   # Install dependencies
   npm install
   
   # Start dev server
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`.

## Testing

- **Backend**: `cd backend && uv run pytest`
- **Frontend**: `cd frontend && npm run test`
