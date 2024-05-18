from flask import jsonify, session
from sqlalchemy import desc, asc

from models.user_model import User

from models.group_model import Group


def sort_by_name(order='asc'):
    if order == 'asc':
        groups = Group.query.order_by(Group.name.asc()).all()
    else:
        groups = Group.query.order_by(Group.name.desc()).all()
    return jsonify([group.serialize for group in groups]), 200


def show_with_more_than_n_members(n):
    groups = Group.query.filter(Group.users.any(len(Group.users) > n)).all()
    return jsonify([group.serialize for group in groups]), 200


def show_joined_groups():
    user = User.query.get(session.get('id'))
    if user is None:
        return {'message': 'User not found'}, 404
    groups = user.groups
    return jsonify([group.serialize for group in groups]), 200
