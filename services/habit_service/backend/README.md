# Habit Service (FastAPI)

## Overview
A small Habit microservice with JWT-protected endpoints. It supports create/read/update/delete habits owned by the authenticated user.

## Run locally (dev)
1. Create a venv and install requirements:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. Start service:
   ```bash
   HABIT_JWT_SECRET="<your-access-secret>" uvicorn app:app --reload --port 8001
   ```

## Environment variables
- HABIT_DATABASE_URL: SQLAlchemy DB URL (default sqlite ./habit.db)
- HABIT_JWT_SECRET: JWT secret to validate tokens
- HABIT_JWT_ALGO: JWT algorithm (default HS256)

## Endpoints
- POST /habit/create  -> create new habit (Auth: Bearer token)
- GET  /habit/all     -> list habits for user (Auth)
- PUT  /habit/update/{habit_id}
- DELETE /habit/delete/{habit_id}
