---
id: 010
title: fix-backend-config-extra-fields
stage: implement
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: fullstack-todo-monorepo
branch: 001-fullstack-todo-monorepo
user: Arsal
command: /sp.implement
labels: ["fix", "backend", "configuration"]
links:
  spec: specs/001-fullstack-todo-monorepo/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/config.py
tests:
  - (none)
---

## Prompt

$ARGUMENTS (Fix Backend Config ValidationError)

## Response snapshot

Updated `backend/src/config.py` to set `extra = "ignore"` in the `Settings.Config` class. This prevents `ValidationError` when unexpected environment variables (like `PYTHONPATH`) are present in `.env`.

## Outcome

- ✅ Impact: Backend can start with polluted .env files.
- 🧪 Tests: N/A (Config change)
- 📁 Files: backend/src/config.py
- 🔁 Next prompts: None.
- 🧠 Reflection: Pydantic Settings strictness defaults can be annoying in dev environments.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
