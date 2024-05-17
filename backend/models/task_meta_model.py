from helpers.main import db
from sqlalchemy.orm import Mapped


class TaskMeta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id: Mapped[int] = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    task: Mapped["Task"] = db.relationship(back_populates="task_meta")
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False),
    # group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
