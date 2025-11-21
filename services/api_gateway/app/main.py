from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.habits import router as habits_router

app = FastAPI(title="API Gateway")

# Register routers
app.include_router(auth_router, prefix="/auth")
app.include_router(habits_router, prefix="/habits")

@app.get("/")
def root():
    return {"message": "API Gateway Running"}
