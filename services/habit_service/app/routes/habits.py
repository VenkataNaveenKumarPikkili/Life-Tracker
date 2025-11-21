from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database

router = APIRouter(prefix="/habits", tags=["Habits"])

# ✅ Get all habits
@router.get("/")
def get_habits(db: Session = Depends(database.get_db)):
    return db.query(models.Habit).all()

# ✅ Create a new habit
@router.post("/", response_model=schemas.HabitResponse)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(database.get_db)):
    new_habit = models.Habit(name=habit.name, description=habit.description, streak=habit.streak)
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

# ✅ Delete a habit (fix indentation)
@router.delete("/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(database.get_db)):
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        return {"error": "Habit not found"}
    db.delete(habit)
    db.commit()
    return {"message": f"Habit '{habit.name}' deleted successfully"}
