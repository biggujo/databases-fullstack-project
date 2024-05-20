from flask import Blueprint
from controllers import task_controller

blueprint = Blueprint('task_route', __name__)

blueprint.route('/', methods=['GET'])(task_controller.index)
blueprint.route('/', methods=['POST'])(task_controller.create)
blueprint.route('/<int:task_id>', methods=['GET'])(task_controller.get)
blueprint.route('/<int:task_id>', methods=['PUT'])(task_controller.update)
blueprint.route('/<int:task_id>', methods=['DELETE'])(task_controller.delete)

blueprint.route('/<int:task_id>/subtasks', methods=['GET'])(task_controller.index)
blueprint.route('/<int:task_id>/subtasks', methods=['POST'])(task_controller.create)
blueprint.route('/<int:task_id>/subtasks/<int:subtask_id>', methods=['PUT'])(task_controller.update)
blueprint.route('/<int:task_id>/subtasks/<int:subtask_id>', methods=['DELETE'])(task_controller.delete)