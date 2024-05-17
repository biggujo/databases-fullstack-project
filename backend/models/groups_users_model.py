from helpers.main import db
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column


class GroupUser(db.Model):
    __tablename__ = 'groups_users'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"))
    group_id: Mapped[int] = mapped_column(db.ForeignKey("groups.id"))
