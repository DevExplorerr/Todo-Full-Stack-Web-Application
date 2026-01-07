---
id: 001
title: initial-project-constitution
stage: constitution
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: Arsal
command: /sp.constitution
labels: ["governance", "setup", "monorepo", "fastapi", "nextjs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - (none)
---

## Prompt

/sp.constitution 

Project: Evolution of Todo - Phase II: Full-Stack Web Application (Monorepo)

Core Principles:
- Monorepo Strictness: Complete separation of concerns. Frontend (`/frontend`) and Backend (`/backend`) must never share code directly.
- Spec-Driven Authority: All implementation details must originate from the `/specs` directory (Spec-Kit Plus structure).
- Stateless Security: Authentication must be stateless using JWTs. The Backend verifies tokens; it does not manage sessions.
- Type Safety: Strict typing everywhere. TypeScript for Frontend, Pydantic/SQLModel for Backend.

Key Standards:
- Frontend: Next.js 16+ (App Router), Tailwind CSS, Better Auth (Client-side).
- Backend: Python FastAPI, SQLModel (ORM), Pydantic.
- Database: Neon Serverless PostgreSQL (accessed via SQLModel).
- Authentication: Better Auth with JWT Plugin. Backend verifies JWT signature.
- API Design: RESTful standards. Endpoints must be protected by Dependency Injection auth guards.

Constraints:
- Directory Structure: Strictly follow the Spec-Kit Monorepo layout (`specs/`, `frontend/`, `backend/`, `.spec-kit/`).
- No Manual SQL: Use SQLModel for all database interactions.
- No "Magic Strings": Use environment variables for secrets (Database URL, Auth Secrets).
- Validation: Frontend must validate inputs before sending; Backend must validate inputs before processing.

Success Criteria:
- A Monorepo structure is established with distinct `frontend` and `backend` services.
- Users can Sign Up/Sign In via Better Auth.
- Users can only View/Edit *their own* tasks (Data Isolation).
- Data persists in Neon DB across restarts.

## Response snapshot

Updated constitution to v1.0.0 defining Monorepo Strictness, Spec-Driven Authority, Stateless Security, and Tech Stack standards.

## Outcome

- ✅ Impact: Established project governance and technical standards.
- 🧪 Tests: N/A
- 📁 Files: Updated constitution.md
- 🔁 Next prompts: Run /sp.specify to begin feature work.
- 🧠 Reflection: Constitution established successfully based on user constraints.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
