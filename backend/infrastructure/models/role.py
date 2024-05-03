from sqlalchemy import Boolean, Column, Integer, String, text

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class Role(Base, BaseModel):
    __tablename__ = "roles"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('roles_id_seq'::regclass)"),
    )
    is_admin = Column(Boolean, nullable=False)
    is_reviewer = Column(Boolean, nullable=False)
    description = Column(String)
