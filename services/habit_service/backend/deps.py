import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

HABIT_JWT_SECRET = os.getenv("HABIT_JWT_SECRET", os.getenv("JWT_ACCESS_SECRET", "replace_with_access_secret"))
HABIT_JWT_ALGO = os.getenv("HABIT_JWT_ALGO", "HS256")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, HABIT_JWT_SECRET, algorithms=[HABIT_JWT_ALGO])
        # try common claim names for user id
        user_id = payload.get("sub") or payload.get("userId") or payload.get("id") or payload.get("user_id") or payload.get("uuid")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload: missing user id")
        return {"id": user_id, "email": payload.get("email")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
