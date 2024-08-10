from typing import Optional
from sqlmodel import Field, Relationship, SQLModel


# user models
class User(SQLModel, table=True):
    user_id: Optional[int] = Field(default=None, primary_key=True)
    user_name: str = Field(index=True)
    user_email: str = Field(index=True)
    user_password: str
    todos: list["Todo"] = Relationship(back_populates="user")

class SignupModel(SQLModel):
    user_name: str
    user_email: str
    user_password: str

class LoginModel(SQLModel):
    user_email: str
    user_password: str

class UserUpdate(SQLModel):
    user_name: str = Field(index=True)
    
# todo models
class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str = Field(index=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.user_id")
    user: Optional[User] = Relationship(back_populates="todos")

class TodoUpdate(SQLModel):
    content: str = Field(index=True)
