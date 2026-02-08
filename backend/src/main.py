from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.db.session import init_db
from src.routes import auth, tasks
from src.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create DB tables on startup
    await init_db()
    yield

# --- FIX: HARDCODED TITLE TO PREVENT CRASH ---
app = FastAPI(
    title="Todo App", 
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Todo API", "status": "running"}