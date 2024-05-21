import math
from datetime import datetime
from flask import jsonify, request, session
from models.group_model import Group
from helpers.main import db
from schemas.group_schemas import validate_group
from models.user_model import User
from models.task_model import Task
from models.task_meta_model import TaskMeta
from decorators.authorize_user import authorize_user
from query.tasks_query import TasksQuery
import math

from schemas.task_schemas import validate_task
from query.group_query import GroupsQuery


def index():
    parameters = request.args
    initial_scope = Group.query
    query_object = GroupsQuery(initial_scope)
    pagination_scope = query_object.call(parameters)
    return jsonify(json_list=[group.serialize for group in pagination_scope.items],
                   page=pagination_scope.page,
                   per_page=pagination_scope.per_page,
                   totalPages=math.ceil(pagination_scope.total / pagination_scope.per_page),
                   )

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
    for task in Task.query_group_tasks(id).all():
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

    user = User.query.get(int(user_id))

    if user not in group.users:
        return {'message': 'User not in group'}, 400

    group.users.remove(user)
    db.session.commit()

    # If no users
    if len(group.users) == 0:
        # Delete the group
        delete(id)

    return {}, 204


def tasks_index(id, task_id=None):
    # user_id = session.get("id")
    # if user_id is None:
    #    return {'message': 'Unauthorized'}, 401

    parameters = request.args

    if task_id is None:
        # All tasks
        initial_scope = Task.query_group_tasks(id)
    else:
        # Subtasks of a task
        task = Task.query.get(task_id)
        initial_scope = task.subtasks

    query_object = TasksQuery(initial_scope)
    pagination_scope = query_object.call(parameters)

    return jsonify(json_list=[task.serialize for task in pagination_scope.items],
                   page=pagination_scope.page,
                   per_page=pagination_scope.per_page,
                   totalPages=math.ceil(pagination_scope.total / pagination_scope.per_page),
                   )


@validate_task
def tasks_create(id, task_id=None):
    body = request.json
    user_id = session.get("id")

    if user_id is None:
        return {'message': 'Unauthorized'}, 401

    name = body.get('name')
    description = body.get('description')
    deadline = body.get('deadline', None)
    new_task = Task(name=name, description=description, deadline=deadline)
    if task_id is None:
        db.session.add(new_task)
        db.session.commit()
        new_task_meta = TaskMeta(task_id=new_task.id, user_id=user_id, group_id=id)
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
def tasks_update(id, task_id, subtask_id=None):
    body = request.json
    if subtask_id is None:
        task = Task.query_group_tasks(id).filter(Task.id == task_id).first()
    else:
        task = Task.query.filter(Task.id == subtask_id).first()

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
def tasks_delete(id, task_id, subtask_id=None):
    if subtask_id is None:
        task = Task.query_group_tasks(id).filter(Task.id == task_id).first()
    else:
        task = Task.query.filter(Task.id == subtask_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    db.session.delete(task)
    db.session.commit()

    return {}, 204


def tasks_get(id, task_id):
    task = Task.query_group_tasks(id).filter(Task.id == task_id).first()

    if task is None:
        return {'message': 'Task not found'}, 404

    return task.serialize, 200
