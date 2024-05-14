from datetime import datetime

from helpers.main import db

# assistant table
group_users = db.Table('group_users',
                       db.Column('id', db.Integer, primary_key=True),
                       db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                       db.Column('group_id', db.Integer, db.ForeignKey('groups.id'))
                       )


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    users = db.relationship('User', secondary=group_users, backref=db.backref('groups', lazy='dynamic'))
    tasks = db.relationship('Task', back_populates='group', lazy='dynamic')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(tz=None), onupdate=datetime.now(tz=None))

    @property
    def serialize(self):
        return {
            # 'id': self.id,
            'name': self.name,
            'users': [user.serialize for user in self.users] if self.users else [],
            # 'tasks': [task.serialize for task in self.tasks.all()] if self.tasks else [],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
