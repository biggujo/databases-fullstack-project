from datetime import datetime
from models.task_model import Task
from models.task_meta_model import TaskMeta
from helpers.main import db
from schemas.task_schemas import validate_task
from flask import request, jsonify, session
from decorators.authorize_user import authorize_user
from query.tasks_query import TasksQuery
import math


def index(task_id=None):
    user_id = session.get("id")

    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    parameters = request.args

    if task_id is None:
        initial_scope = Task.query_user_tasks(user_id)
    else:
        task = Task.query.get(task_id)
        if task is None:
            return {'message': 'Nothing found'}, 404

        initial_scope = task.subtasks

    query_object = TasksQuery(initial_scope)
    pagination_scope = query_object.call(parameters)

    return jsonify(json_list=[task.serialize for task in pagination_scope],
                   page=pagination_scope.page,
                   per_page=pagination_scope.per_page,
                   totalPages=math.ceil(pagination_scope.total / pagination_scope.per_page),
                   )


@validate_task
def create(task_id=None):
    body = request.json
    user_id = session.get("id")
    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    name = body.get('name')
    description = body.get('description')

    deadline = body.get('deadline')

    new_task = Task(name=name, description=description, deadline=deadline)

    if task_id is None:
        db.session.add(new_task)
        db.session.commit()
        new_task_meta = TaskMeta(task_id=new_task.id, user_id=user_id)
        db.session.add(new_task_meta)
    else:
        task = Task.query.get(task_id)
        if task is None:
            return {'message': 'Parent task not found'}, 404
        task.subtasks.append(new_task)
        db.session.add(new_task)
    db.session.commit()

    return new_task.serialize, 201


@validate_task
def update(task_id, subtask_id=None):
    body = request.json
    user_id = session.get("id")
    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    if subtask_id is None:
        task = Task.query_user_tasks(user_id).filter_by(id=task_id).first()
    else:
        task = Task.query.filter_by(id=subtask_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    fields = ['name', 'description', 'isDone', 'deadline']

    for field in fields:
        if field in body:
            setattr(task, field, body.get(field))

    task.updated_at = datetime.now(tz=None)
    db.session.commit()

    return task.serialize, 200


@authorize_user
def delete(task_id, subtask_id=None):
    user_id = session.get("id")
    if subtask_id is None:
        task = Task.query_user_tasks(user_id).filter_by(id=task_id).first()
    else:
        task = Task.query.filter_by(id=subtask_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(task)
    db.session.commit()

    return {}, 204


@authorize_user
def get(task_id, subtask_id=None):
    user_id = session.get("id")

    if subtask_id is None:
        task = Task.query_user_tasks(user_id).filter_by(id=task_id).first()
    else:
        task = Task.query.get(subtask_id)

    if task is None:
        return {'message': 'Task not found'}, 404

    return task.serialize, 200
