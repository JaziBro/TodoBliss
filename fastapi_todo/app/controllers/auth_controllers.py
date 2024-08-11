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
    print(f"Attempting login with username: {form_data.username}")
    
    query = select(User).where(User.user_email == form_data.username)
    db_user = session.exec(query).one_or_none()

    if db_user is None:
        print("User not found")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print(f"Found user: {db_user.user_email}")
    
    is_password_correct = verifyPassword(form_data.password, db_user.user_password)
    if not is_password_correct:
        print("Incorrect password")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = generateAccessToken({"sub": str(db_user.user_id)}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    print(f"Generated token: {token}")

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
