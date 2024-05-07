from flask import Blueprint
from controllers import user_controller

blueprint = Blueprint('user_route', __name__)

blueprint.route('/', methods=['GET'])(user_controller.index)
blueprint.route('/create', methods=['POST'])(user_controller.create)
blueprint.route('/login', methods=['POST'])(user_controller.login)
blueprint.route('/logout', methods=['DELETE'])(user_controller.logout)
