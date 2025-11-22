from sqlalchemy.orm import Session
from . import models, schemas

def create_habit(db: Session, h: schemas.HabitCreate):
    habit = models.Habit(
        user_id=h.user_id,
        title=h.title,
        description=h.description,
        frequency=h.frequency or "daily",
        status=h.status or "active"
    )
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

def get_habits_for_user(db: Session, user_id: str):
    return db.query(models.Habit).filter(models.Habit.user_id == str(user_id)).order_by(models.Habit.created_at.desc()).all()

def get_habit(db: Session, habit_id: str):
    return db.query(models.Habit).filter(models.Habit.id == str(habit_id)).first()

def update_habit(db: Session, habit: models.Habit, h_update: schemas.HabitUpdate):
    if h_update.title is not None:
        habit.title = h_update.title
    if h_update.description is not None:
        habit.description = h_update.description
    if h_update.frequency is not None:
        habit.frequency = h_update.frequency
    if h_update.status is not None:
        habit.status = h_update.status
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

def delete_habit(db: Session, habit: models.Habit):
    db.delete(habit)
    db.commit()
