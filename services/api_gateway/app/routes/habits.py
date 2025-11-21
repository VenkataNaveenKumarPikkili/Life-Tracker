from fastapi import APIRouter, Request
import httpx
from app.config import HABIT_SERVICE_URL

router = APIRouter()

@router.get("/")
async def list_habits(request: Request):
    token = request.headers.get("authorization")
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{HABIT_SERVICE_URL}/habits/", headers={"Authorization": token})
        return res.json()
