from flask import request
from pydantic import Field, BaseModel


class GroupSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=128)


def validate_group(func):
    def wrapper(*args, **kwargs):
        try:
            GroupSchema(**{
                "name": request.json.get("name")
            })
            func(*args, **kwargs)
        except Exception as e:
            raise e

    wrapper.__name__ = func.__name__
    return func