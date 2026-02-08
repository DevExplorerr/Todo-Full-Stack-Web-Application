# Feature: Authentication

## Overview
Secure, stateless authentication using JWTs.

## Flow
1. **Signup/Login**: User enters credentials on Frontend (Better Auth Client).
2. **Token Issue**: Better Auth Provider issues a JWT.
3. **Storage**: Frontend stores JWT (secure cookie or storage managed by Better Auth).
4. **Request**: Frontend attaches `Authorization: Bearer <token>` to API requests.
5. **Verification**: Backend Middleware verifies JWT signature using `BETTER_AUTH_SECRET`.
6. **Access**: If valid, `request.state.user_id` is populated. If invalid, 401 Unauthorized.
