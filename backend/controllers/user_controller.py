from    models.user_model import User
from helpers.main import db
from schemas.user_schemas import validate_user_schema
from flask import request, session, jsonify


def index():
    return jsonify(json_list=[user.serialize for user in User.query.all()])


@validate_user_schema
def create():
    body = request.json

    username = body.get('username')
    password = body.get('password')

    user = User.query.filter_by(username=username).first()

    if user is not None:
        return {'message': 'User already exists'}, 400

    new_user = User(username=username)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    session['is_logged_in'] = True
    session['id'] = new_user.id
    return new_user.serialize, 201


@validate_user_schema
def login():
    body = request.json

    username = body.get('username')
    password = body.get('password')

    user = User.query.filter_by(username=username).first()

    auth_error = {
        "message": "Invalid login or password",
    }, 400

    if user is None:
        return auth_error

    if not user.check_password(password):
        return auth_error

    session['is_logged_in'] = True
    session['id'] = user.id
    return user.serialize, 200


def logout():
    if 'is_logged_in' not in session:
        return {
            "message": "Already logged out"
        }, 400

    session.pop('is_logged_in')
    session.pop('id')
    return {}, 204
