from flask import Blueprint
from controllers import task_controller

blueprint = Blueprint('task_route', __name__)

blueprint.route('/', methods=['GET'])(task_controller.index)
blueprint.route('/', methods=['POST'])(task_controller.create)
blueprint.route('/<int:id>', methods=['GET'])(task_controller.get)
blueprint.route('/<int:id>', methods=['PUT'])(task_controller.update)
blueprint.route('/<int:id>', methods=['DELETE'])(task_controller.delete)
