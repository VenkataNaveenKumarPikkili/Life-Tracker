from pydantic import BaseModel
from datetime import date
from typing import Optional


# 🧱 Base schema (shared fields)
class HabitBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_completed: Optional[bool] = False


# 🆕 Schema for creating a habit
class HabitCreate(HabitBase):
    pass


# 📦 Schema for DB response
class HabitResponse(HabitBase):
    id: int
    created_at: date

    class Config:
        orm_mode = True
