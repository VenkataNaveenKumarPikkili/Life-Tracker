# Auth Service (Life-Tracker)

Java 17 Spring Boot auth service with JWT, JPA (Postgres), and BCrypt.
Endpoints:
- POST /auth/signup  -> { email, password, name } returns { token }
- POST /auth/login   -> { email, password } returns { token }
- GET  /auth/me      -> requires Authorization: Bearer <token>

Run locally:
1. Ensure Postgres running and create database 'lifetracker_auth' or update application.properties
2. mvn clean package
3. mvn spring-boot:run