from datetime import datetime

class TasksQuery:
    def __init__(self, initial_scope):
        self.scope = initial_scope

    def call(self, parameters):
        self._sort_by_name(parameters.get('sort_name'))
        self._sort_by_deadline(parameters.get('sort_deadline'))
        self._filter_by_status(parameters.get('status'))
        self._filter_by_date_range(parameters.get('start_date'), parameters.get('end_date'))
        self._paginate(parameters.get('page'), parameters.get('per_page'))
        return self.scope

    def _sort_by_name(self, order):
        if order == 'asc':
            self.scope = sorted(self.scope, key=lambda task: task.name)
        elif order == 'desc':
            self.scope = sorted(self.scope, key=lambda task: task.name, reverse=True)

    def _sort_by_deadline(self, order):
        if order == 'asc':
            self.scope = sorted(self.scope, key=lambda task: task.deadline)
        elif order == 'desc':
            self.scope = sorted(self.scope, key=lambda task: task.deadline, reverse=True)

    def _filter_by_status(self, status):
        if status == 'completed':
            self.scope = [task for task in self.scope if task.status == 'completed']
        elif status == 'in_progress':
            self.scope = [task for task in self.scope if task.status == 'in_progress']
        elif status == 'overdue':
            self.scope = [task for task in self.scope if task.status == 'in_progress' and task.deadline < datetime.now()]

    def _filter_by_date_range(self, start_date, end_date):
        if start_date and end_date:
            start_date = datetime.fromisoformat(start_date)
            end_date = datetime.fromisoformat(end_date)
            self.scope = [task for task in self.scope if start_date <= task.deadline <= end_date]

    def _paginate(self, page, per_page):
        if page is None or per_page is None:
            return
        page = int(page)
        per_page = int(per_page)
        start = (page - 1) * per_page
        end = start + per_page
        self.scope = self.scope[start:end]
