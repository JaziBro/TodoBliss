from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from jose import jwt
from passlib.context import CryptContext
from app.settings import ALGORITHM, SECRET_KEY

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# generate a JWT access token
def generateAccessToken(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# decoding access token
def decodeAccessToken(token: str):
    decoded_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return decoded_data

# converts the password into hash(encrypts it)
def convertPasswordintoHash(password: str):
    hashed_password = pwd_context.hash(password)
    return hashed_password

# checks if the password given by user matches to the hashed one and returns it
def verifyPassword(user_plain_password: str, hash_password: str):
    isPasswordCorrect = pwd_context.verify(user_plain_password, hash=hash_password)

    if isPasswordCorrect:
        return True
    else:
        raise HTTPException(status_code=404, detail="Incorrect password")
    
