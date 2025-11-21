from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import List, Dict
from app.models import Habit, Completion

# HABIT CRUD
def create_habit(db: Session, title: str, description: str | None = None) -> Habit:
    h = Habit(title=title, description=description or "")
    db.add(h)
    db.commit()
    db.refresh(h)
    return h

def get_habits(db: Session) -> List[Habit]:
    return db.query(Habit).order_by(Habit.id.desc()).all()

def get_habit_by_uuid(db: Session, uuid: str) -> Habit | None:
    return db.query(Habit).filter(Habit.uuid == uuid).first()

def update_habit(db: Session, uuid: str, title: str | None = None, description: str | None = None, completed: bool | None = None) -> Habit:
    h = get_habit_by_uuid(db, uuid)
    if not h:
        return None
    if title is not None:
        h.title = title
    if description is not None:
        h.description = description
    if completed is not None:
        h.completed = completed
    db.add(h)
    db.commit()
    db.refresh(h)
    return h

def delete_habit(db: Session, uuid: str) -> bool:
    h = get_habit_by_uuid(db, uuid)
    if not h:
        return False
    db.delete(h)
    db.commit()
    return True

# COMPLETIONS
def add_completion(db: Session, habit_uuid: str, on_date: date | None = None) -> Completion | None:
    h = get_habit_by_uuid(db, habit_uuid)
    if not h:
        return None
    d = on_date or date.today()
    # prevent duplicate completion for same day
    exists = db.query(Completion).filter(Completion.habit_id == h.id, Completion.date == d).first()
    if exists:
        return exists
    c = Completion(habit_id=h.id, date=d)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

def remove_completion(db: Session, habit_uuid: str, on_date: date) -> bool:
    h = get_habit_by_uuid(db, habit_uuid)
    if not h:
        return False
    c = db.query(Completion).filter(Completion.habit_id == h.id, Completion.date == on_date).first()
    if not c:
        return False
    db.delete(c)
    db.commit()
    return True

def get_completion_dates(db: Session, habit_uuid: str, days: int = 30) -> List[date]:
    h = get_habit_by_uuid(db, habit_uuid)
    if not h:
        return []
    start = date.today() - timedelta(days=days)
    rows = db.query(Completion).filter(Completion.habit_id == h.id, Completion.date >= start).all()
    return [r.date for r in rows]

# DAILY SUMMARY (for charts)
def daily_completions_summary(db: Session, days: int = 7) -> List[Dict]:
    today = date.today()
    out = []
    for i in range(days-1, -1, -1):
        d = today - timedelta(days=i)
        count = db.query(Completion).filter(Completion.date == d).count()
        out.append({"date": d.isoformat(), "count": count})
    return out

# STREAKS (simple algorithm)
def streak_for_habit(db: Session, habit_uuid: str) -> int:
    dates = sorted(get_completion_dates(db, habit_uuid, days=365), reverse=True)
    if not dates:
        return 0
    streak = 0
    current = date.today()
    for d in dates:
        # counts consecutive days from today backwards
        if d == current:
            streak += 1
            current = current - timedelta(days=1)
        elif d < current:
            # if missing day, stop
            break
    return streak

def overall_weekly_streaks(db: Session) -> Dict[str,int]:
    # returns habit_uuid -> streak for each habit (streak counted up to today)
    out = {}
    habits = get_habits(db)
    for h in habits:
        out[h.uuid] = streak_for_habit(db, h.uuid)
    return out

def create_habit(db: Session, habit: HabitCreate, user_id: str):
    new_habit = Habit(
        uuid=str(uuid4()),
        title=habit.title,
        description=habit.description,
        user_id=user_id
    )
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

    def get_habits(db: Session, user_id: str):
    return db.query(Habit).filter(Habit.user_id == user_id).all()

