from datetime import datetime
from typing import List
from sqlalchemy.orm import Mapped

from helpers.main import db


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    users = db.relationship('User', secondary="groups_users", backref=db.backref('groups', lazy='dynamic'))
    task_meta = db.relationship('TaskMeta', back_populates="group", cascade="all, delete-orphan")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'users': [user.serialize for user in self.users] if self.users else [],
            # 'tasks': [task.serialize for task in self.tasks.all()] if self.tasks else [],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
