from flask import jsonify, session, request
from sqlalchemy import desc, asc, func

from models.user_model import User

from models.group_model import Group

from controllers import group_controller


def handle_request():
    if 'order' in request.args:
        return sort_by_name(request.args.get('order'))
    if 'n' in request.args:
        return show_with_more_than_n_members(int(request.args.get('n')))
    if 'joined' in request.args:
        return show_joined_groups()
    else:
        return group_controller.index()


def sort_by_name(order='asc'):
    if order == 'asc':
        groups = Group.query.order_by(Group.name.asc()).all()
    else:
        groups = Group.query.order_by(Group.name.desc()).all()
    return jsonify([group.serialize for group in groups]), 200


def show_with_more_than_n_members(n):
    groups = Group.query.join(Group.users).group_by(Group.id).having(func.count(User.id) > n).all()
    return jsonify([group.serialize for group in groups]), 200


def show_joined_groups():
    user = User.query.get(session.get('id'))
    if user is None:
        return {'message': 'User not found'}, 404
    groups = user.groups
    return jsonify([group.serialize for group in groups]), 200
