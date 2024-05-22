from flask import request
from pydantic import BaseModel, Field


class TaskSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=128)
    description: str = Field(..., min_length=3, max_length=512)


def validate_task(func):
    def wrapper(*args, **kwargs):
        try:
            TaskSchema(**{
                "name": request.json.get("name"),
                "description": request.json.get("description")
            })
            func(*args, **kwargs)
        except Exception as e:
            raise e

    wrapper.__name__ = func.__name__
    return func
