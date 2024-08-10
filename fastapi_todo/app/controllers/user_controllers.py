from typing import Annotated
from fastapi import Depends
from sqlmodel import Session, select
from fastapi import HTTPException
from app.auth.auth import convertPasswordintoHash
from app.database.database import get_session
from app.models.models import User, SignupModel, LoginModel


# func for user signup
async def signup_func(signup_form: SignupModel, session: Annotated[Session, Depends(get_session)]):
    try:
        # Check if user with the provided email already exists
        query = select(User).where(User.user_email == signup_form.user_email)
        existing_user = session.exec(query).one_or_none()

        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        # Hash the password before storing it
        hashed_password = convertPasswordintoHash(signup_form.user_password)

        # Create a new user instance
        new_user = User(
            user_name=signup_form.user_name,
            user_email=signup_form.user_email,
            user_password=hashed_password
        )

        # Add the new user to the database
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return {"user": new_user}
    except HTTPException as e:
        raise e
    
    
