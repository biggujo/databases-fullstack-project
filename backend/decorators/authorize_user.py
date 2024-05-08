from flask import session, abort
from functools import wraps


def authorize_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        current_user_id = session.get("id")

        if current_user_id is None:
            abort(401)

        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    return wrapper
