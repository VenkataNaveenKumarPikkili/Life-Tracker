from sqlalchemy import Column, String, Text, DateTime
import enum, uuid
from .database import Base
from sqlalchemy import func

class Habit(Base):
    __tablename__ = "habits"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), index=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    frequency = Column(String(20), default="daily")
    status = Column(String(20), default="active")
    created_at = Column(DateTime, server_default=func.now())
