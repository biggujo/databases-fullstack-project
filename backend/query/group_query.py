from flask import session
from models.group_model import Group
from sqlalchemy.sql import func

from models.user_model import User


class GroupsQuery:
    def __init__(self, initial_scope):
        self.total = None
        self.scope = initial_scope

    def call(self, parameters):
        self._filter_by_name(parameters)
        self._filter_by_members(parameters)
        self._filter_joined(parameters)
        self._sort_by_name(parameters)
        return self._paginate(parameters)  # Returns Pagination object

    def _filter_by_name(self, parameters):
        query = parameters.get('query')

        if query is None:
            return

        self.scope = self.scope.filter(Group.name.contains(query))

    def _sort_by_name(self, parameters):
        order = parameters.get('order')

        if order == 'asc':
            self.scope = self.scope.order_by(func.lower(Group.name).asc())
        elif order == 'desc':
            self.scope = self.scope.order_by(func.lower(Group.name).desc())

    def _filter_by_members(self, parameters):
        n = parameters.get('n')

        if n is not None:
            self.scope = self.scope.join(Group.users).group_by(Group.id).having(func.count(User.id) > n)

    def _filter_joined(self, parameters):
        joined = parameters.get('joined')
        if joined is not None and joined.lower() == 'true':
            user = User.query.get(session.get('id'))
            if user is None:
                return {'message': 'User not found'}, 404
            self.scope = self.scope.filter(Group.users.contains(user))

    def _paginate(self, parameters):
        page = parameters.get('page', 1)
        per_page = parameters.get('per_page', 50)

        if page is None or per_page is None:
            return

        return self.scope.paginate(page=int(page), per_page=int(per_page), error_out=False, count=True)

