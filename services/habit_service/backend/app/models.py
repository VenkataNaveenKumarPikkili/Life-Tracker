from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime
import uuid
from sqlalchemy import Column, String, Integer, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

def gen_uuid():
    # store as string for simplicity (you can change to UUID type if desired)
    return str(uuid.uuid4())

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, unique=True, default=gen_uuid, nullable=False)  # stable id used in APIs
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(Date, default=func.current_date())

    completions = relationship("Completion", back_populates="habit", cascade="all, delete-orphan")

class Completion(Base):
    __tablename__ = "completions"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False, default=func.current_date())

    habit = relationship("Habit", back_populates="completions")

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    completed = Column(Boolean, default=False)
    user_id = Column(String, index=True)   # <--- IMPORTANT
    created_at = Column(Date)