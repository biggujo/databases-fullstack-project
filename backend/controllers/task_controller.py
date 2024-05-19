from datetime import datetime
from models.task_model import Task
from models.task_meta_model import TaskMeta
from helpers.main import db
from schemas.task_schemas import validate_task
from flask import request, jsonify, session
from decorators.authorize_user import authorize_user
from query.tasks_query import TasksQuery

def index():
    user_id = session.get("id")
    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    parameters = request.args
    initial_scope = Task.query_user_tasks(user_id).all()

    query_object = TasksQuery(initial_scope)
    scoped_data = query_object.call(parameters)

    return jsonify(json_list=[task.serialize for task in scoped_data])


@validate_task
def create():
    body = request.json
    user_id = session.get("id")

    name = body.get('name')
    description = body.get('description')
    deadline = body.get('deadline')

    new_task = Task(name=name, description=description, deadline=deadline)
    db.session.add(new_task)
    db.session.commit()

    new_task_meta = TaskMeta(task_id=new_task.id, user_id=user_id)
    db.session.add(new_task_meta)
    db.session.commit()

    return new_task.serialize, 201


@validate_task
def update(id):
    body = request.json
    user_id = session.get("id")

    task = Task.query_user_tasks(user_id).filter_by(id=id).first()
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
def delete(id):
    user_id = session.get("id")
    task = Task.query_user_tasks(user_id).filter_by(id=id).first()
    if task is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(task)
    db.session.commit()

    return {}, 204


@authorize_user
def get(id):
    user_id = session.get("id")
    task = Task.query_user_tasks(user_id).filter_by(id=id).first()
    if task is None:
        return {'message': 'Task not found'}, 404

    return task.serialize, 200
