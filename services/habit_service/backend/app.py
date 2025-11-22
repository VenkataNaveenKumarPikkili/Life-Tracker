from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy in-memory habits
habits_db = [
    {"id": 1, "title": "Morning Walk", "completed": False},
]

@app.get("/api/habits/", response_model=List[dict])
def list_habits():
    return habits_db

@app.post("/api/habits/")
def create_habit(habit: dict):
    new_id = len(habits_db) + 1
    habit["id"] = new_id
    habits_db.append(habit)
    return habit
