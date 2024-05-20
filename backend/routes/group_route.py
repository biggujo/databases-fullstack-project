from flask import Blueprint
from controllers import group_controller

from controllers import task_controller

blueprint = Blueprint('group_route', __name__)

blueprint.route('/', methods=['GET'])(group_controller.index)
# blueprint.route('/', methods=['GET'])(group_controller.index)
# blueprint.route('/<string:order>', methods=['GET'])(group_query.sort_by_name)
# blueprint.route('/with_more_than/<int:n>', methods=['GET'])(group_query.show_with_more_than_n_members)
# blueprint.route('/joined', methods=['GET'])(group_query.show_joined_groups)
blueprint.route('/', methods=['POST'])(group_controller.create)
blueprint.route('/<int:id>', methods=['GET'])(group_controller.get)
blueprint.route('/<int:id>', methods=['PUT'])(group_controller.update)
blueprint.route('/<int:id>', methods=['DELETE'])(group_controller.delete)
blueprint.route('/<int:id>/users', methods=['POST'])(group_controller.add_user)
blueprint.route('/<int:id>/users', methods=['DELETE'])(group_controller.remove_user)
blueprint.route('/<int:id>/tasks', methods=['GET'], endpoint='group_tasks')(group_controller.tasks_index)
blueprint.route('/<int:id>/tasks', methods=['POST'], endpoint='group_tasks_create')(group_controller.tasks_create)
blueprint.route('/<int:id>/tasks/<int:task_id>', methods=['GET'], endpoint='group_task_get')(group_controller.tasks_get)
blueprint.route('/<int:id>/tasks/<int:task_id>', methods=['PUT'], endpoint='group_tasks_update')(
    group_controller.tasks_update)
blueprint.route('/<int:id>/tasks/<int:task_id>', methods=['DELETE'], endpoint='group_tasks_delete')(
    group_controller.tasks_delete)
blueprint.route('/<int:id>/tasks/<int:task_id>/subtasks', methods=['GET'])(group_controller.tasks_index)
blueprint.route('/<int:id>/tasks/<int:task_id>/subtasks', methods=['POST'])(group_controller.tasks_create)
blueprint.route('/<int:id>/tasks/<int:task_id>/subtasks/<int:subtask_id>', methods=['PUT'])(group_controller.tasks_update)
blueprint.route('/<int:id>/tasks/<int:task_id>/subtasks/<int:subtask_id>', methods=['DELETE'])(group_controller.tasks_delete)
