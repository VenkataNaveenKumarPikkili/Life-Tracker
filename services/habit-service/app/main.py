from fastapi import FastAPI
from .routes import habits

# ✅ This line is required — this is your FastAPI app instance
app = FastAPI(title="Habit Tracker Service")

# ✅ Include your routes
app.include_router(habits.router)

# ✅ Optional root route
@app.get("/")
def root():
    return {"message": "Welcome to Habit Tracker Service 🚀"}
