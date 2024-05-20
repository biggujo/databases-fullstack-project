from datetime import datetime

from helpers.main import db
from models.task_meta_model import TaskMeta


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(512), unique=False, nullable=False)
    isDone = db.Column(db.Boolean, nullable=False, default=False)
    deadline = db.Column(db.DateTime, nullable=True)
    task_meta = db.relationship('TaskMeta', back_populates="task", cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))

    @staticmethod
    def query_user_tasks(user_id):
        return Task.query.join(TaskMeta).filter_by(id=TaskMeta.task_id, user_id=user_id)

    @staticmethod
    def query_group_tasks(group_id):
        return Task.query.join(TaskMeta).filter_by(group_id=group_id, id=TaskMeta.task_id)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'isDone': self.isDone,
            'deadline': self.deadline,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
