from flask import request
from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=32)
    password: str = Field(..., min_length=6, max_length=32)


def validate_user_schema(func):
    def wrapper(*args, **kwargs):
        try:
            UserSchema(**{
                "username": request.json.get("username"),
                "password": request.json.get("password")
            })

            func(*args, **kwargs)
        except Exception as e:
            raise e

    wrapper.__name__ = func.__name__
    return func
