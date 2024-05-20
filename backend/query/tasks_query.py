from datetime import datetime
from models.task_model import Task
from sqlalchemy.sql import func


class TasksQuery:
    def __init__(self, initial_scope):
        self.scope = initial_scope

    def call(self, parameters):
        self._filter_by_date_range(parameters)
        self._filter_by_status(parameters)
        self._sort_by_name(parameters)
        self._sort_by_deadline(parameters)
        # self._paginate(parameters)
        return self.scope.all()

    def _sort_by_name(self, parameters):
        order = parameters.get('sort_name')

        if order == 'asc':
            self.scope = self.scope.order_by(func.lower(Task.name).asc())
        elif order == 'desc':
            self.scope = self.scope.order_by(func.lower(Task.name).desc())

    def _sort_by_deadline(self, parameters):
        order = parameters.get('sort_deadline')

        if order == 'asc':
            self.scope = self.scope.order_by(Task.deadline)
        elif order == 'desc':
            self.scope = self.scope.order_by(Task.deadline.desc())

    def _filter_by_status(self, parameters):
        status = parameters.get('status')

        if status == 'completed':
            self.scope = self.scope.filter(Task.isDone == True)
        elif status == 'in_progress':
            self.scope = self.scope.filter(Task.isDone == False)
        elif status == 'overdue':
            self.scope = self.scope.filter(Task.isDone == False, Task.deadline < datetime.now())

    def _filter_by_date_range(self, parameters):
        start_date = parameters.get('start_date')
        end_date = parameters.get('end_date')

        if not start_date or not end_date:
            return

        start_date = datetime.fromisoformat(start_date)
        end_date = datetime.fromisoformat(end_date)

        self.scope = self.scope.filter(Task.deadline <= end_date, Task.deadline >= start_date)

    def _paginate(self, parameters):
        page = parameters.get('page')
        per_page = parameters.get('per_page')

        if page is None or per_page is None:
            return self.scope
        page = int(page)
        per_page = int(per_page)
        start = (page - 1) * per_page
        end = start + per_page
        self.scope = self.scope[start:end]
