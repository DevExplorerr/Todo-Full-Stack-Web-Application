<!--
Sync Impact Report:
- Version Change: Initial -> 1.0.0
- Modified Principles: Defined Principles I-VI based on user input.
- Added Sections: Technology Standards, Development Constraints.
- Templates requiring updates: ✅ None (Standard templates are compatible).
-->
# Evolution of Todo - Phase II: Full-Stack Web Application (Monorepo) Constitution

## Core Principles

### I. Monorepo Strictness
Complete separation of concerns is mandatory. The codebase is divided into discrete services, specifically `frontend/` and `backend/`. These directories must never share code directly (no relative imports across service boundaries). Shared contracts or types must be defined in the specification or a dedicated shared package if architecturally permitted, but direct cross-service coupling is prohibited.

### II. Spec-Driven Authority
All implementation details, data models, and API contracts must originate from the `specs/` directory (following the Spec-Kit Plus structure). Code is downstream of specification. We do not write code to "explore"; we write code to fulfill a defined spec. Any deviation requires a spec update first.

### III. Stateless Security
Authentication and authorization must be stateless. The system uses JWTs (JSON Web Tokens) for identity verification. The Backend service verifies tokens but does not manage session state (no server-side sessions). This ensures scalability and strict separation of authentication concerns.

### IV. Type Safety
Strict typing is enforced across the entire stack.
- **Frontend**: TypeScript is mandatory. `any` types are prohibited unless strictly justified and isolated.
- **Backend**: Python with Type Hints, Pydantic, and SQLModel is mandatory. Data crossing boundaries must be validated against typed schemas.

### V. Validation & Data Integrity
Trust no input.
- **Frontend**: Must validate all user inputs before transmission.
- **Backend**: Must independently validate all incoming data before processing or persistence.
- **Persistence**: Data must be persisted in the Neon Serverless PostgreSQL database. Users can only view and edit their own data (strict data isolation).

### VI. No Magic Strings & Secure Configuration
Hardcoded secrets, credentials, or configuration URLs are strictly prohibited. All environment-specific configuration (Database URLs, Auth Secrets, API Keys) must be managed via environment variables.

## Technology Standards

### Frontend
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth (Client-side integration)

### Backend
- **Framework**: Python FastAPI
- **ORM**: SQLModel (Pydantic + SQLAlchemy)
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT verification via Better Auth plugin/standards

### API Design
- **Protocol**: RESTful API standards
- **Security**: All protected endpoints must utilize Dependency Injection for auth guards.

## Development Constraints

### Directory Structure
The project must strictly adhere to the Spec-Kit Monorepo layout:
- `specs/`: Source of truth for requirements and design.
- `frontend/`: Next.js application.
- `backend/`: FastAPI application.
- `.spec-kit/`: Tooling and configuration.

### Database Interaction
- **No Manual SQL**: All database interactions must be performed using SQLModel. Raw SQL queries are discouraged unless required for complex optimizations (must be documented).

## Governance

This Constitution supersedes all other development practices.
- **Amendments**: Changes to these principles require a documented Architectural Decision Record (ADR) and a version bump of this Constitution.
- **Compliance**: All Pull Requests and Code Reviews must explicitly verify compliance with these principles.
- **Runtime Guidance**: Use the `specs/` directory for all feature definitions.

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07