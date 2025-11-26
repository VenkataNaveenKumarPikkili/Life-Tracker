from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(tags=["Habits"])

# ---------------- MODELS ---------------- #
class HabitCreate(BaseModel):
    name: str
    icon: str = "🔥"

class TogglePayload(BaseModel):
    date: str

class Habit(BaseModel):
    id: str
    name: str
    icon: str
    history: List[str] = []

# In-memory DB
habits_db: dict[str, Habit] = {}


@router.get("/", response_model=List[Habit])
def list_habits():
    return list(habits_db.values())


@router.post("/", response_model=Habit)
def create_habit(payload: HabitCreate):
    new_id = str(len(habits_db) + 1)
    habit = Habit(id=new_id, name=payload.name, icon=payload.icon, history=[])
    habits_db[new_id] = habit
    return habit


@router.patch("/toggle/{habit_id}", response_model=Habit)
def toggle_habit(habit_id: str, payload: TogglePayload):
    habit = habits_db.get(habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    if payload.date in habit.history:
        habit.history.remove(payload.date)
    else:
        habit.history.append(payload.date)

    return habit


@router.delete("/{habit_id}")
def delete_habit(habit_id: str):
    if habit_id not in habits_db:
        raise HTTPException(status_code=404, detail="Habit not found")

    del habits_db[habit_id]
    return {"deleted": habit_id}
