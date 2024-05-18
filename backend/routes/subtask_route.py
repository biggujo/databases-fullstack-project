from flask import Blueprint

from controllers import subtask_controller

blueprint = Blueprint('subtask_route', __name__)

blueprint.route('/<int:task_id>/subtasks', methods=['GET'])(subtask_controller.index)
blueprint.route('/<int:task_id>/subtasks', methods=['POST'])(subtask_controller.create)
blueprint.route('/<int:task_id>/subtasks/<int:subtask_id>', methods=['PUT'])(subtask_controller.update)
blueprint.route('/<int:task_id>/subtasks/<int:subtask_id>', methods=['DELETE'])(subtask_controller.delete)