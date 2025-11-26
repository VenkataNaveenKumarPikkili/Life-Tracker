from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as habit_router   # ← FIXED import path

app = FastAPI(title="Habit Service")

# ================= CORS FIX ===================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= ROUTES ======================
app.include_router(habit_router, prefix="/api/habits")


@app.get("/")
def root():
    return {"message": "Habit service is running"}
