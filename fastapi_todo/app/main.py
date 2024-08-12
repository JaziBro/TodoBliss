#main.py
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from fastapi import FastAPI, Depends, HTTPException
from app.controllers.auth_controllers import get_current_user, login_func 
from app.controllers.user_controllers import signup_func
from app.database.database import create_db_and_tables, get_session, lifespan
from app.models.models import User, Todo, TodoUpdate, UserUpdate
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    lifespan=lifespan, title="Todo API with DB", 
    version="0.0.1",
    servers=[
        {
            "url": "https://mycontainerapp.salmongrass-d2b6dc74.eastus.azurecontainerapps.io", 
            "description": "Production Server"
        }
    ] 
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://todo-bliss.vercel.app",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db_and_tables()


@app.get('/')
def read_root():
    return {"Hello": "World"}

# add todo
@app.post("/todos/", response_model=Todo)
def create_todo(todo: Todo, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    if not todo.content:
        raise HTTPException(status_code=400, detail="Content cannot be empty")
    
    # Debugging log
    print(f"Current user: {current_user}")
    print(f"Current user ID: {current_user.user_id}")

    # Set the user_id from the current user
    todo.user_id = current_user.user_id
    
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

# get all todos
@app.get("/todos/", response_model=list[Todo])
def read_todos(session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    todos = session.exec(select(Todo).where(Todo.user_id == current_user.user_id)).all()
    return todos

# get a single todo
@app.get("/todos/{todo_id}/", response_model=Todo)
def read_todo(todo_id: int, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    todo = session.exec(select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.user_id)).first()
    if todo is None:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")
    return todo

# delete todo
@app.delete("/todos/{todo_id}/")
def delete_todo(todo_id: int, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    todo = session.exec(select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.user_id)).first()
    if todo:
        session.delete(todo)
        session.commit()
        return {"message": f"Todo with ID {todo_id} deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")

# update a todo
@app.put("/todos/{todo_id}/", response_model=Todo)
def update_todo(todo_id: int, todo_update: TodoUpdate, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    print(f"Current user: {current_user}")  # Debugging log
    print(f"Current user ID: {current_user.user_id}")  # Debugging log

    todo = session.exec(select(Todo).where(Todo.id == todo_id, Todo.user_id == current_user.user_id)).first()
    if todo:
        if todo_update.content:
            todo.content = todo_update.content
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo
    else:
        raise HTTPException(status_code=404, detail=f"Todo with ID {todo_id} not found")


# USER ROUTES

# route to get user
@app.get("/{user_id}/")
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")
    
    return user
   
# route for signing up
@app.post("/signup")
async def add_user(token: Annotated[dict, Depends(signup_func)]):
    if not token:
        HTTPException(
            status_code=400, detail="Sorry, your token was not generated. Try Again!")
    return token

# route for logging in
@app.post("/token", response_model=dict)
async def token_endpoint(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    try:
        return login_func(form_data, session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# route for logging out
@app.post("/logout")
def logout(current_user: User = Depends(get_current_user)):
    return {"message": "Logged out successfully"}

# route to delete user
@app.delete("/delete_user/{user_id}/")
def delete_user(user_id: int, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    user = session.get(User, user_id)
    if user:
        session.delete(user)
        session.commit()
        return {"message": f"User with ID {user_id} deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

# route to update user credentials
@app.put("/update_user/{user_id}/")
def update_user(user_id: int, user_update: UserUpdate, session: Annotated[Session, Depends(get_session)], current_user: User = Depends(get_current_user)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(user, key, value)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
