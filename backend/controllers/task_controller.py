from datetime import datetime

from models.task_model import Task
from helpers.main import db
from schemas.task_schemas import validate_task
from flask import request, jsonify, session

from decorators.authorize_user import authorize_user


def index():
    user_id = session.get("id")
    if user_id is None:
        return 401
    return jsonify(json_list=[i.serialize for i in Task.query.filter_by(user_id=user_id).all()])


@validate_task
def create():
    body = request.json
    user_id = session.get("id")

    name = body.get('name')
    description = body.get('description')
    deadline = body.get('deadline')

    new_task = Task(name=name, description=description, deadline=deadline, user_id=user_id)

    db.session.add(new_task)
    db.session.commit()

    return new_task.serialize, 201


@validate_task
def update(id):
    body = request.json
    user_id = session.get("id")

    task = Task.query.filter_by(id=id, user_id=user_id).first()
    if task is None:
        return {'message': 'Task not found'}, 404

    if 'name' in body:
        task.name = body.get('name')
    if 'description' in body:
        task.description = body.get('description')
    if 'deadline' in body:
        task.deadline = body.get('deadline')
    if 'isDone' in body:
        task.isDone = body.get('isDone')
    task.updated_at = datetime.now(tz=None)
    db.session.commit()

    return task.serialize, 200


@authorize_user
def delete(id):
    user_id = session.get("id")

    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(task)
    db.session.commit()

    return {}, 204


def get(id):
    user_id = session.get("id")

    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    return task.serialize, 200
