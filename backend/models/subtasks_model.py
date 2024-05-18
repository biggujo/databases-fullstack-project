from datetime import datetime

from helpers.main import db


class Subtask(db.Model):
    __tablename__ = 'subtasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(512), unique=False, nullable=False)
    isDone = db.Column(db.Boolean, nullable=False, default=False)
    parent_task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    deadline = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))

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