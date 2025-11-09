from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# ✅ Load environment variable or default value
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://naveen:password@localhost:5432/habitdb")

# ✅ Create engine
engine = create_engine(DATABASE_URL)

# ✅ Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base class for models
Base = declarative_base()

# ✅ Dependency for database sessions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
