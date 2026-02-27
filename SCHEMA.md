# Fist Gear - Database Schema

## Overview

Fist Gear uses **PostgreSQL** as its database, **Drizzle ORM** for schema definition and queries, and **better-auth** for authentication logic. The schema follows better-auth's required structure to handle user signup, login, and session management.

---

## Stack

| Layer            | Technology   | Role                                      |
|------------------|--------------|-------------------------------------------|
| **Database**     | PostgreSQL   | Stores all user and auth data             |
| **ORM**          | Drizzle ORM  | Schema definition, migrations, queries    |
| **Auth Library** | better-auth  | Signup, login, sessions, password hashing |

---

## Tables

### 1. `user`

Stores the identity of each person who signs up.

| Column           | Type      | Constraints       | Description                        |
|------------------|-----------|-------------------|------------------------------------|
| `id`             | text      | PK                | Unique user identifier             |
| `name`           | text      | NOT NULL          | Full name (first + last combined)  |
| `email`          | text      | NOT NULL, UNIQUE  | Used for login                     |
| `email_verified` | boolean   | NOT NULL, default `false` | Whether email is verified  |
| `image`          | text      | nullable          | Profile image URL                  |
| `created_at`     | timestamp | NOT NULL, default `now()` | Account creation time      |
| `updated_at`     | timestamp | NOT NULL, default `now()` | Last update time           |

---

### 2. `session`

Tracks active login sessions. Each time a user logs in, a session row is created. Deleting it logs them out.

| Column       | Type      | Constraints              | Description                      |
|--------------|-----------|--------------------------|----------------------------------|
| `id`         | text      | PK                       | Session identifier               |
| `user_id`    | text      | NOT NULL, FK → `user.id` | Which user owns this session     |
| `token`      | text      | NOT NULL, UNIQUE         | Random token stored as a cookie  |
| `expires_at` | timestamp | NOT NULL                 | When the session becomes invalid |
| `ip_address` | text      | nullable                 | IP of the device at login        |
| `user_agent` | text      | nullable                 | Browser/device info at login     |
| `created_at` | timestamp | NOT NULL, default `now()` | Session creation time           |
| `updated_at` | timestamp | NOT NULL, default `now()` | Last update time                |

**On delete:** If a user is deleted, all their sessions are cascade-deleted.

---

### 3. `account`

Links a user to their login method(s). A single user can have multiple accounts (e.g., email/password + Google).

| Column                      | Type      | Constraints              | Description                              |
|-----------------------------|-----------|--------------------------|------------------------------------------|
| `id`                        | text      | PK                       | Account record identifier                |
| `user_id`                   | text      | NOT NULL, FK → `user.id` | Which user this login method belongs to  |
| `account_id`                | text      | NOT NULL                 | Provider-specific user ID                |
| `provider_id`               | text      | NOT NULL                 | Auth provider (e.g., `credential`, `google`) |
| `access_token`              | text      | nullable                 | OAuth access token (social logins)       |
| `refresh_token`             | text      | nullable                 | OAuth refresh token (social logins)      |
| `access_token_expires_at`   | timestamp | nullable                 | When access token expires                |
| `refresh_token_expires_at`  | timestamp | nullable                 | When refresh token expires               |
| `scope`                     | text      | nullable                 | OAuth permission scope                   |
| `id_token`                  | text      | nullable                 | OAuth ID token                           |
| `password`                  | text      | nullable                 | Hashed password (email/password auth)    |
| `created_at`                | timestamp | NOT NULL, default `now()` | Record creation time                    |
| `updated_at`                | timestamp | NOT NULL, default `now()` | Last update time                        |

**On delete:** If a user is deleted, all their accounts are cascade-deleted.

**For Fist Gear:** Most users will have one account row with `provider_id: "credential"` and a hashed `password`. The OAuth fields are for future social login support (Google, Apple).

---

### 4. `verification`

Stores temporary verification tokens (e.g., email verification, password reset links).

| Column       | Type      | Constraints               | Description                     |
|--------------|-----------|---------------------------|---------------------------------|
| `id`         | text      | PK                        | Verification record identifier  |
| `identifier` | text      | NOT NULL                  | What is being verified (email)  |
| `value`      | text      | NOT NULL                  | The verification token/code     |
| `expires_at` | timestamp | NOT NULL                  | When the token becomes invalid  |
| `created_at` | timestamp | NOT NULL, default `now()` | Record creation time            |
| `updated_at` | timestamp | NOT NULL, default `now()` | Last update time                |

---

## Relationships

```
user (1)
 ├── session (many)     — one user can have multiple active sessions
 ├── account (many)     — one user can have multiple login methods
 └── verification       — temporary tokens linked by email identifier
```

---

## Auth Flow

### Sign Up (email/password)
1. User submits first name, last name, email, password
2. better-auth creates a row in `user` (name = "First Last")
3. better-auth creates a row in `account` (providerId = "credential", password = hashed)
4. better-auth creates a row in `session` and sends the token as a cookie
5. User is logged in

### Sign In
1. User submits email and password
2. better-auth looks up the `account` row by email → verifies hashed password
3. Creates a new `session` row and sends the token as a cookie
4. User is logged in

### Session Check (on each request)
1. Browser sends the session cookie
2. better-auth looks up the `session` row by token
3. If valid and not expired → request is authenticated
4. If expired or missing → redirect to login

---

## File Reference

| File                  | Purpose                              |
|-----------------------|--------------------------------------|
| `src/db/schema.ts`    | Drizzle table definitions            |
| `src/db/index.ts`     | Database connection (pg Pool)        |
| `drizzle.config.ts`   | Drizzle Kit config (migrations CLI)  |
| `.env.local`          | `DATABASE_URL` connection string     |
