# Auth Service (Java - Spring Boot)

This is a Spring Boot authentication microservice for the Life Planner app.

Features:
- Signup / Login
- JWT access tokens and refresh tokens
- PostgreSQL + Flyway migrations
- No Dockerfile or Kubernetes manifests in this build (per request)

## Requirements
- Java 17+
- Maven 3.8+
- PostgreSQL (local or remote)

## Quick start (local)

1. Create a PostgreSQL database and user, e.g.:
   ```sql
   CREATE DATABASE auth_db;
   CREATE USER auth_user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_user;
   ```

2. Set environment variables (or edit `src/main/resources/application.yml`):
   ```
   export DATABASE_URL=jdbc:postgresql://localhost:5432/auth_db
   export DB_USER=auth_user
   export DB_PASS=password
   export JWT_ACCESS_SECRET=replace_with_access_secret_very_long
   export JWT_REFRESH_SECRET=replace_with_refresh_secret_very_long
   export ACCESS_TTL_SECONDS=900
   export REFRESH_TTL_DAYS=30
   ```

3. Build and run:
   ```
   mvn clean package
   mvn spring-boot:run
   ```

4. Endpoints:
   - `POST /api/auth/signup` { email, password, name? }
   - `POST /api/auth/login` { email, password } -> returns { accessToken, refreshToken }
   - `POST /api/auth/refresh` { refreshToken } -> rotated tokens
   - `POST /api/auth/logout` { refreshToken }
   - `GET /api/auth/me` (requires Authorization: Bearer <accessToken>)

Notes:
- Flyway will run automatically on startup to create tables.
- Change `spring.jpa.hibernate.ddl-auto` if needed for dev.
