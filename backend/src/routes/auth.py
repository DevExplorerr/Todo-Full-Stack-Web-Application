from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.db.session import get_session
from src.models import User
from src.auth.utils import verify_password, get_password_hash
from src.auth.jwt import create_access_token, get_current_user
from pydantic import BaseModel, EmailStr

router = APIRouter()

# --- Input Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- 1. Sign Up Route ---
@router.post("/sign-up/email", status_code=status.HTTP_201_CREATED)
async def sign_up(user_in: UserCreate, session: Session = Depends(get_session)):
    # Check existing user
    statement = select(User).where(User.email == user_in.email)
    result = await session.execute(statement)
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create User
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        name=user_in.name
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    
    # Generate Token
    token = create_access_token({"sub": str(new_user.id)})
    
    return {
        "status": True,
        "user": {"id": new_user.id, "email": new_user.email, "name": new_user.name},
        "token": token
    }

# --- 2. Sign In Route (Fixing the 404) ---
@router.post("/sign-in/email")
async def sign_in(user_in: UserLogin, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == user_in.email)
    result = await session.execute(statement)
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    token = create_access_token({"sub": str(user.id)})
    
    return {
        "status": True,
        "user": {"id": user.id, "email": user.email, "name": user.name},
        "token": token
    }

# --- 3. Get Session Route (Fixing the Protected Route 404) ---
@router.get("/get-session")
async def get_session_info(current_user: User = Depends(get_current_user)):
    # This endpoint allows the frontend to validate the token
    return {
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name
        },
        "session": {"id": "stateless-session"} # Mock session object for Better Auth compatibility
    }