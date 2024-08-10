from datetime import timedelta, datetime
from typing import Annotated
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlmodel import Session, select
from app.auth.auth import generateAccessToken, verifyPassword
from app.database.database import get_session
from app.models.models import LoginModel, User
from app.settings import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

from fastapi.security import OAuth2PasswordRequestForm

def login_func(form_data: OAuth2PasswordRequestForm, session: Annotated[Session, Depends(get_session)]):
    # SQL query to check if user email (provided by user) is present in db
    query = select(User).where(User.user_email == form_data.username)  # Email used as username
    db_user = session.exec(query).one_or_none()

    # if user email not found in db, exception raised
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Password checking
    is_password_exist = verifyPassword(form_data.password, db_user.user_password)
    # if password is incorrect, exception raised
    if not is_password_exist:
        raise HTTPException(status_code=404, detail="Incorrect password")

    # JWT token generation
    token = generateAccessToken({"sub": str(db_user.user_id)}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = int(payload.get("sub"))
        print(f"Decoded user ID from token: {user_id}")  # Debugging log
    except JWTError:
        raise HTTPException(status_code=404, detail="User not found")

    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    print(f"Fetched user from DB: {user}")  # Debugging log
    return user
