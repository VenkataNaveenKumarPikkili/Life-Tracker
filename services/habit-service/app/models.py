from sqlalchemy import Column, Integer, String, Boolean, Date
from datetime import date
from .database import Base   # ✅ important: use the dot (.) for relative import

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    is_completed = Column(Boolean, default=False)
    created_at = Column(Date, default=date.today)

