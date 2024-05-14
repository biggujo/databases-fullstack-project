from datetime import datetime

from helpers.main import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    description = db.Column(db.String(512), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    isDone = db.Column(db.Boolean, nullable=False, default=False)
    deadline = db.Column(db.DateTime, nullable=False, default=datetime)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)
    group = db.relationship('Group', backref=db.backref('group_tasks', lazy='dynamic'))


    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'isDone': self.isDone,
            'deadline': self.deadline
            # 'group_id': self.group_id
            'isDone': self.isDone
        }
