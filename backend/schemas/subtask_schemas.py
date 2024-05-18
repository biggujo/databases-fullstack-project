from flask import request
from pydantic import BaseModel, Field


class SubtasksSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=128)
    description: str = Field(..., min_length=3, max_length=512)


def validate_subtask(func):
    def wrapper(*args, **kwargs):
        try:
            SubtasksSchema(**{
                "name": request.json.get("name"),
                "description": request.json.get("description"),
                # "isDone": request.json.get("isDone")
            })
            func(*args, **kwargs)
        except Exception as e:
            raise e

    wrapper.__name__ = func.__name__
    return func
