# Data Model: Full-Stack Todo Monorepo

## Entities

### User
Represents a registered user of the system.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | UUID | Yes | Yes | Primary Key. |
| email | String | Yes | Yes | User's email address. |
| password_hash | String | Yes | No | Hashed password (managed by Auth system). |
| created_at | DateTime | Yes | No | Timestamp of registration. |
| updated_at | DateTime | Yes | No | Timestamp of last profile update. |

### Task
Represents a todo item belonging to a user.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | UUID | Yes | Yes | Primary Key. |
| user_id | UUID | Yes | No | Foreign Key to User.id. |
| title | String | Yes | No | Title of the task (Max 255 chars). |
| description | String | No | No | Detailed description. |
| is_completed | Boolean | Yes | No | Completion status. Default: False. |
| created_at | DateTime | Yes | No | Timestamp of creation. |
| updated_at | DateTime | Yes | No | Timestamp of last update. |

## Relationships

- **User (1) -> (N) Task**: One user can have many tasks. A task belongs to exactly one user.
- **Cascade Delete**: Deleting a User should delete all their Tasks.

## Validation Rules

- **User.email**: Must be a valid email format.
- **Task.title**: Must not be empty or whitespace only.
- **Task.title**: Max length 255 characters.
