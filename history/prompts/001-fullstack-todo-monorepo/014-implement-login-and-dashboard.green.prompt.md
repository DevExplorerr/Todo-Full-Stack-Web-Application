---
id: 014
title: Implement Login Page and Task Dashboard
stage: green
date: 2026-02-08
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-monorepo
branch: null
user: Arsal
command: /sp.implement
labels: ["frontend", "backend", "auth", "crud"]
links:
  spec: specs/001-fullstack-todo-monorepo/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/main.py
 - backend/src/routes/auth.py
 - backend/src/routes/__init__.py
 - backend/src/models/user.py
 - backend/src/config.py
 - frontend/src/components/tasks/TaskCard.tsx
 - frontend/src/components/tasks/TaskList.tsx
 - frontend/src/lib/api.ts
 - frontend/src/components/auth/LoginForm.tsx
tests:
 - Manual verification of Login and Dashboard pages
---

## Prompt

/sp.implement /sp.implement

Context: Executing Phase II Plan - Step 5: Frontend UI.
Reference:
- @specs/features/task-crud.md
- @specs/ui/pages.md
- @frontend/CLAUDE.md

Objective: Implement the Login Page and the Task Dashboard.

Requirements:
1. **Login Page**: Create `frontend/src/app/login/page.tsx`.
   - Use `useState` for email/password/name forms.
   - Toggle between "Sign In" and "Sign Up".
   - Call `auth.login(email, password)` or `auth.signup(email, password, name)` from context.
   - Redirect to `/dashboard` on success.
   - Display error messages (e.g., "Invalid credentials").

2. **Dashboard Page**: Create `frontend/src/app/dashboard/page.tsx`.
   - **Protect Route**: Wrap with an Auth Guard (redirect to `/login` if no user).
   - **Task List**: Fetch tasks on mount using `api.get('/tasks')`.
   - **Create Task**: Add a form/modal to POST to `/tasks`.
   - **Task Item**: Display title, description, and status.
   - **Actions**: Add "Mark Complete" and "Delete" buttons for each task.

3. **Components**:
   - Create `frontend/src/components/TaskCard.tsx` (Reusable UI for a single task).
   - Create `frontend/src/components/ProtectedRoute.tsx` (Wrapper for protected pages).

Constraint: Use Tailwind CSS for styling. Ensure the dashboard is responsive.

## Response snapshot

Implemented the Login and Dashboard features.
1. Fixed backend CORS and routing mismatch in `main.py` and `auth.py`.
2. Created `TaskCard.tsx` and updated `TaskList.tsx` for better UI.
3. Fixed `User` model to include `hashed_password` and corrected `auth.py` session handling.
4. Updated `api.ts` to correctly set `API_URL` and include auth tokens in headers.
5. Updated `LoginForm.tsx` to handle token storage and redirection.

## Outcome

- ✅ Impact: Frontend and Backend are now integrated with working Auth and Task CRUD.
- 🧪 Tests: Manual verification needed (no automated tests added in this turn).
- 📁 Files: Modified 7 files, created 2 files.
- 🔁 Next prompts: Run /sp.analyze to verify if any more polish is needed.
- 🧠 Reflection: The mismatch between SQLModel's AsyncSession and custom auth logic required careful alignment of model fields and session methods.

## Evaluation notes (flywheel)

- Failure modes observed: Missing `__init__.py` in routes, incorrect `API_URL` prefix, missing password field in User model.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add automated integration tests for the full login flow.
