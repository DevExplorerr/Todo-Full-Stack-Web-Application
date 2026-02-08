# Tasks: Full-Stack Todo Monorepo

**Input**: Design documents from `specs/001-fullstack-todo-monorepo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Optional (Manual Verification prioritized)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [x] T001 Create directory structure (`frontend/`, `backend/`, `specs/`, `.spec-kit/`) at root
- [x] T002 Initialize Backend project with `pyproject.toml` and basic `src/main.py` in `backend/`
- [x] T003 Initialize Frontend project with `package.json` and basic Next.js structure in `frontend/`
- [x] T004 Create root `CLAUDE.md` and context files in `frontend/CLAUDE.md` and `backend/CLAUDE.md`
- [x] T005 Populate `specs/` with `database/schema.md`, `api/openapi.yaml`, and `features/auth.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [x] T006 Implement Database connection in `backend/src/db/session.py` (Neon + SQLModel)
- [x] T007 [P] Implement JWT verification middleware in `backend/src/auth/middleware.py`
- [x] T008 [P] Configure Better Auth client in `frontend/src/lib/auth-client.ts`
- [x] T009 Define shared TypeScript interfaces in `frontend/src/types/index.ts` (User, Task)

**Checkpoint**: Backend connects to DB, Frontend has Auth Client configured.

---

## Phase 3: User Story 1 - User Authentication (Priority: P1)

**Goal**: Users can sign up, sign in, and receive a valid JWT.

**Independent Test**: Register a user via Frontend, verify JWT in localStorage/Cookie, verify Backend accepts token.

### Implementation

- [x] T010 [US1] Create User model in `backend/src/models/user.py`
- [x] T011 [US1] Create Auth routes (if using custom backend auth endpoints) or Verify Better Auth integration in `frontend/src/components/auth/LoginForm.tsx`
- [x] T012 [US1] Implement Backend endpoint `GET /me` to verify token in `backend/src/routes/auth.py`
- [x] T013 [US1] Create Protected Route wrapper in Frontend `frontend/src/components/layout/ProtectedRoute.tsx`

**Checkpoint**: User can log in and access a protected route.

---

## Phase 4: User Story 2 - Task Management (Priority: P2)

**Goal**: Users can create, read, update, and delete tasks.

**Independent Test**: Full CRUD cycle on Tasks.

### Implementation

- [x] T014 [US2] Create Task model in `backend/src/models/task.py`
- [x] T015 [US2] Implement Task CRUD routes in `backend/src/routes/tasks.py`
- [x] T016 [US2] Register Task router in `backend/src/main.py`
- [x] T017 [US2] Implement Task API client in `frontend/src/lib/api.ts`
- [x] T018 [US2] Create TaskList component in `frontend/src/components/tasks/TaskList.tsx`
- [x] T019 [US2] Create TaskForm component in `frontend/src/components/tasks/TaskForm.tsx`
- [x] T020 [US2] Assemble Task Dashboard page in `frontend/src/app/dashboard/page.tsx`

**Checkpoint**: Users can manage their tasks.

---

## Phase 5: User Story 3 - Data Isolation Enforcement (Priority: P3)

**Goal**: Ensure users only see their own data.

**Independent Test**: Verify User A cannot see User B's tasks.

### Implementation

- [x] T021 [US3] Verify and Enforce `user_id` filtering in `backend/src/routes/tasks.py` (Review & Add Tests)
- [x] T022 [US3] Add automated test for isolation in `backend/tests/integration/test_isolation.py`

**Checkpoint**: Data isolation verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and final verification.

- [x] T023 Update `README.md` with setup instructions
- [x] T024 Verify all `specs/` match implementation
- [x] T025 Final linting and formatting check (Backend `ruff`, Frontend `eslint`)

---

## Dependencies & Execution Order

- **Phase 1 & 2** are strictly sequential.
- **Phase 3 (Auth)** blocks Phase 4 & 5.
- **Phase 4 (Tasks)** depends on Auth.
- **Phase 5 (Isolation)** validates Phase 4.

## Implementation Strategy

1. **MVP First**: Complete up to Phase 3 to prove the stack works.
2. **Feature Complete**: Complete Phase 4 for core functionality.
3. **Secure**: Phase 5 ensures the "Monorepo" isn't just a folder structure but a secure app.
