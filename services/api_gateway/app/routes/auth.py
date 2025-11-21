from fastapi import APIRouter, Request
import httpx
from app.config import AUTH_SERVICE_URL

router = APIRouter()

@router.post("/login")
async def login(request: Request):
    data = await request.json()
    async with httpx.AsyncClient() as client:
        res = await client.post(f"{AUTH_SERVICE_URL}/login", json=data)
        return res.json()


@router.get("/me")
async def me(request: Request):
    token = request.headers.get("authorization")
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{AUTH_SERVICE_URL}/me",
            headers={"Authorization": token}
        )
        return res.json()
