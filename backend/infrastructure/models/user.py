from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel

# IT complains that Role is not imported... What if role depend of user??
from backend.infrastructure.models.role import Role


class User(Base, BaseModel):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('users_id_seq'::regclass)"),
    )
    username = Column(String)
    role_id = Column(ForeignKey("roles.id"), ForeignKey("roles.id"))
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    email = Column(String, nullable=False)

    role = relationship(Role)
