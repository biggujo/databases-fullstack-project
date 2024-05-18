from datetime import datetime

from flask import jsonify, request, session
from models.group_model import Group
from helpers.main import db
from schemas.group_schemas import validate_group
from models.user_model import User
from models.task_model import Task
from models.task_meta_model import TaskMeta
from controllers import task_controller
from decorators.authorize_user import authorize_user

from schemas.task_schemas import validate_task

from schemas.subtask_schemas import validate_subtask

from models.subtasks_model import Subtask


def index():
    groups = Group.query.all()
    return jsonify([group.serialize for group in groups]), 200


@authorize_user
@validate_group
def create():
    body = request.json
    name = body.get('name')
    user_id = session.get('id')
    user = User.query.get(user_id)
    if user is None:
        return {'message': 'User not found'}, 404

    new_group = Group(name=name, users=[user])
    db.session.add(new_group)
    db.session.commit()
    return new_group.serialize, 201


def get(id):
    group = Group.query.get(id)
    if group is None:
        return {'message': 'Group not found'}, 404
    return group.serialize, 200


@validate_group
@authorize_user
def update(id):
    body = request.json
    group = Group.query.get(id)
    if group is None:
        return {'message': 'Group not found'}, 404
    if 'name' in body:
        group.name = body.get('name')
        db.session.commit()
        return group.serialize, 200


@authorize_user
def delete(id):
    group = Group.query.get(id)
    if group is None:
        return {'message': 'Group not found'}, 404
    for task in group.tasks.all():
        db.session.delete(task)
    db.session.delete(group)
    db.session.commit()
    return {}, 204


@authorize_user
def add_user(id):
    user_id = session.get("id")
    group = Group.query.get(id)
    if group is None:
        return {'message': 'Group not found'}, 404
    user = User.query.get(user_id)
    if user is None:
        return {'message': 'User not exists???'}, 404
    group.users.append(user)
    db.session.commit()
    return {}, 204


@authorize_user
def remove_user(id):
    user_id = session.get("id")
    group = Group.query.get(id)

    if group is None:
        return {'message': 'Group not found'}

    user = User.query.get(user_id)
    group.users.remove(user)
    db.session.commit()
    return {}, 204


# @authorize_user
# def tasks(id):
#    group = Group.query.get(id)
#    if group is None:
#        return {'message': 'Group not found'}
#    current_user = session.get("id")
#    if current_user is None:
#        return {'message': 'Not authprizes'}, 401
#    if current_user not in [user.id for user in group.users]:
#        return {'message': 'Access denied'}, 403
#    group_tasks = group.tasks
#    return jsonify([task.serialize for task in group_tasks]), 200


def tasks_index(id):
    # user_id = session.get("id")
    # if user_id is None:
    #    return {'message': 'Unauthorized'}, 401
    return jsonify(json_list=[i.serialize for i in Task.query_group_tasks(id).all()])


@validate_task
def tasks_create(id):
    body = request.json
    user_id = session.get("id")

    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    name = body.get('name')
    description = body.get('description')
    deadline = body.get('deadline', None)

    new_task = Task(name=name, description=description, deadline=deadline)

    db.session.add(new_task)
    db.session.commit()

    new_task_meta = TaskMeta(task_id=new_task.id, user_id=user_id, group_id=id)

    db.session.add(new_task_meta)
    db.session.commit()

    return new_task.serialize, 201


@validate_task
def tasks_update(id, task_id):
    body = request.json

    task = Task.query_group_tasks(id).filter_by(id=task_id).first()

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
def tasks_delete(id, task_id):
    task = Task.query_group_tasks(id).filter_by(id=task_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(task)
    db.session.commit()

    return {}, 204


def tasks_get(id, task_id):
    task = Task.query_group_tasks(id).filter_by(id=task_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    return task.serialize, 200


def subtasks_index(id, task_id):
    group = Group.query.get(id)
    if group is None:
        return {'message': 'Group not found'}, 404
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        return {'message': 'Task not found'}, 404
    return jsonify([subtask.serialize for subtask in task.subtasks]), 200

@validate_subtask
def subtasks_create(id, task_id):
    body = request.json

    name = body.get('name')
    description = body.get('description')

    deadline = body.get('deadline')
    new_subtask = Subtask(name=name, description=description, deadline=deadline, parent_task_id=task_id)

    db.session.add(new_subtask)
    db.session.commit()

    return new_subtask.serialize, 201


def subtasks_update(id, task_id, subtask_id):
    body = request.json

    subtask = Subtask.query.filter_by(id=subtask_id, parent_task_id=task_id).first()

    if subtask is None:
        return {'message': 'Subtask not found'}, 404

    fields = ['name', 'description', 'isDone', 'deadline']

    for field in fields:
        if field in body:
            setattr(subtask, field, body.get(field))

    subtask.updated_at = datetime.now(tz=None)
    db.session.commit()

    return subtask.serialize, 200


def subtasks_delete(id, task_id, subtask_id):
    subtask = Subtask.query.filter_by(id=subtask_id, parent_task_id=task_id).first()

    if subtask is None:
        return {'message': 'Subtask not found'}, 404

    db.session.delete(subtask)
    db.session.commit()

    return {}, 204
