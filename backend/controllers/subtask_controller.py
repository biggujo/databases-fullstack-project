from datetime import datetime

from models.task_model import Task
from helpers.main import db
from schemas.task_schemas import validate_task
from flask import request, jsonify

from decorators.authorize_user import authorize_user

from models.subtasks_model import Subtask

from schemas.subtask_schemas import validate_subtask


def index(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return {'message': 'Task not found'}, 404
    return jsonify([subtask.serialize for subtask in task.subtasks]), 200


@validate_subtask
def create(task_id):
    body = request.json

    name = body.get('name')
    description = body.get('description')

    deadline = body.get('deadline')
    new_subtask = Subtask(name=name, description=description, deadline=deadline, parent_task_id=task_id)

    db.session.add(new_subtask)
    db.session.commit()

    return new_subtask.serialize, 201


@validate_subtask
def update(task_id, subtask_id):
    body = request.json

    subtask = Subtask.query.filter_by(id=subtask_id, parent_task_id=task_id).first()

    if subtask is None:
        return {'message': 'Task not found'}, 404

    fields = ['name', 'description', 'isDone', 'deadline']

    for field in fields:
        if field in body:
            setattr(subtask, field, body.get(field))

    subtask.updated_at = datetime.now(tz=None)
    db.session.commit()

    return subtask.serialize, 200


@authorize_user
def delete(task_id, subtask_id):
    subtask = Subtask.query.filter_by(id=subtask_id, parent_task_id=task_id).first()

    if subtask is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(subtask)
    db.session.commit()

    return {}, 204