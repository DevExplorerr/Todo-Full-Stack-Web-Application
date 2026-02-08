---
id: 012
title: fix-asyncpg-sslmode-error
stage: implement
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: fullstack-todo-monorepo
branch: 001-fullstack-todo-monorepo
user: Arsal
command: /sp.implement
labels: ["fix", "backend", "database", "ssl"]
links:
  spec: specs/001-fullstack-todo-monorepo/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/db/session.py
tests:
  - (none)
---

## Prompt

$ARGUMENTS (Fix AsyncPG sslmode TypeError)

## Response snapshot

Updated `backend/src/db/session.py` to strip `sslmode` from the `DATABASE_URL` query parameters and pass `connect_args={"ssl": "require"}` to the engine instead. This fixes the `TypeError: connect() got an unexpected keyword argument 'sslmode'` when connecting to Neon Postgres.

## Outcome

- ✅ Impact: Backend successfully connects to Neon DB with SSL.
- 🧪 Tests: N/A (Config/Connection fix)
- 📁 Files: backend/src/db/session.py
- 🔁 Next prompts: None.
- 🧠 Reflection: Asyncpg is strict about connection string parameters compared to psycopg2.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
