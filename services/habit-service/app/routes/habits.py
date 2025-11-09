from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal, engine

# Create all tables (only once)
models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/habits", tags=["Habits"])

# Dependency: Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new habit
@router.post("/", response_model=schemas.HabitResponse)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    db_habit = models.Habit(name=habit.name, description=habit.description)
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

# Get all habits
@router.get("/", response_model=list[schemas.HabitResponse])
def get_habits(db: Session = Depends(get_db)):
    return db.query(models.Habit).all()

# Update habit
@router.put("/{habit_id}", response_model=schemas.HabitResponse)
def update_habit(habit_id: int, habit: schemas.HabitBase, db: Session = Depends(get_db)):
    db_habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not db_habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db_habit.name = habit.name
    db_habit.description = habit.description
    db_habit.is_completed = habit.is_completed
    db.commit()
    db.refresh(db_habit)
    return db_habit

# Delete habit
@router.delete("/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    db_habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not db_habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(db_habit)
    db.commit()
    return {"message": "Habit deleted successfully"}
