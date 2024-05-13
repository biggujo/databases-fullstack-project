from datetime import datetime

from helpers.main import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False, default='1970-01-01')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    isDone = db.Column(db.Boolean, nullable=False, default=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'deadline': self.deadline,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'isDone': self.isDone
        }
