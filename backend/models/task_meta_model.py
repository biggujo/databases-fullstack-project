from helpers.main import db
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column


class TaskMeta(db.Model):
    __tablename__ = 'tasks_meta'

    id: Mapped[int] = mapped_column(primary_key=True)
    task_id: Mapped[int] = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    task: Mapped["Task"] = db.relationship(back_populates="task_meta")
    user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"))
    group_id: Mapped[Optional[int]] = mapped_column(db.ForeignKey("groups.id"))
    group: Mapped["Group"] = db.relationship(back_populates="task_meta")
