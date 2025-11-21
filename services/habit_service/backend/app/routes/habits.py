from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import HabitCreate, HabitUpdate
from app.crud.crud import (
    create_habit, get_habits, update_habit, delete_habit,
    add_completion, remove_completion,
    daily_completions_summary, overall_weekly_streaks
)
from app.auth import verify_jwt

router = APIRouter()

@router.get("/")
def list_habits(
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    return get_habits(db, user_id)


@router.post("/")
def create(
    habit: HabitCreate,
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    return create_habit(db, habit, user_id)


@router.put("/{habit_id}")
def update(
    habit_id: int,
    habit: HabitUpdate,
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    return update_habit(db, habit_id, habit, user_id)


@router.delete("/{habit_id}")
def delete(
    habit_id: int,
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    return delete_habit(db, habit_id, user_id)


@router.post("/{habit_id}/complete")
def complete(
    habit_id: int,
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    return add_completion(db, habit_id, user_id)


@router.post("/{habit_id}/uncomplete")
def uncomplete(
    habit_id: int,
    user_id: str = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    return remove_completion(db, habit_id, user_id)


@router.get("/summary/daily")
def summary(user_id: str = Depends(verify_jwt), db: Session = Depends(get_db)):
    return daily_completions_summary(db, user_id)


@router.get("/streaks/weekly")
def weekly(user_id: str = Depends(verify_jwt), db: Session = Depends(get_db)):
    return overall_weekly_streaks(db, user_id)
