from fastapi import FastAPI
from app.routes.habits import router as habits_router
from app.database import init_db

# Init DB tables
init_db()

app = FastAPI(title="Habit Tracker API")

@app.get("/")
def root():
    return {"message": "Habit Tracker Running"}

app.include_router(habits_router, prefix="/habits", tags=["Habits"])
