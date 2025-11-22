from pydantic import BaseModel, Field
from typing import Optional

class HabitBase(BaseModel):
    title: str = Field(..., example="Drink water")
    description: Optional[str] = Field(None, example="Drink 2L water daily")
    frequency: Optional[str] = Field("daily", example="daily")
    status: Optional[str] = Field("active", example="active")

class HabitCreate(HabitBase):
    user_id: Optional[str] = None

class HabitUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    frequency: Optional[str]
    status: Optional[str]

class HabitOut(HabitBase):
    id: str
    user_id: str
    created_at: str

    class Config:
        orm_mode = True
