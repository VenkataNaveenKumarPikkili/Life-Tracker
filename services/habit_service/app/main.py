from fastapi import FastAPI
from app.routes import habits
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS Middleware (so frontend can connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ include habits router
app.include_router(habits.router)

@app.get("/")
def root():
    return {"message": "Welcome to Life Tracker API"}
