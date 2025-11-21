from pydantic import BaseModel
from typing import Optional
from datetime import date

class HabitBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = False

class HabitCreate(BaseModel):
    title: str
    description: Optional[str] = None

class HabitUpdate(HabitBase):
    pass

class Completion(BaseModel):
    date: date

    class Config:
        orm_mode = True

class HabitResponse(BaseModel):
    uuid: str
    title: str
    description: Optional[str]
    completed: bool

    class Config:
        orm_mode = True
