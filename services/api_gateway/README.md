# FastAPI API Gateway

This simple API Gateway forwards requests to your Auth and Habit services and validates JWTs.

## Files
- `main.py` — gateway app
- `config.py` — configurable URLs & JWT secret
- `auth.py` — JWT utilities
- `proxy.py` — request forwarding
- `requirements.txt` — Python deps
- `.env.example` — copy to `.env`

## Setup

1. Copy repo:
   ```bash
   git clone <your-repo> api-gateway
   cd api-gateway
