from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.db.session import get_session
from src.models import Task, User
from src.auth.jwt import get_current_user
from typing import List

router = APIRouter()

# --- Create Task ---
@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    task: Task, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    task.user_id = current_user.id
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task

# --- Get All Tasks (For Current User) ---
@router.get("/", response_model=List[Task])
async def read_tasks(
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    # Async query using execute()
    statement = select(Task).where(Task.user_id == current_user.id)
    result = await session.execute(statement)
    tasks = result.scalars().all()
    return tasks

# --- Update Task ---
@router.put("/{task_id}", response_model=Task)
async def update_task(
    task_id: int, 
    task_update: dict, # Receiving partial updates as dict
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    result = await session.execute(statement)
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    # Apply updates
    for key, value in task_update.items():
        setattr(task, key, value)
        
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task

# --- Delete Task ---
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    result = await session.execute(statement)
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    await session.delete(task)
    await session.commit()
    return None