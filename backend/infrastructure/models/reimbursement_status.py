from sqlalchemy import Column, Integer, String, text

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class ReimbursementStatus(Base, BaseModel):
    __tablename__ = "reimbursement_status"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('roles_id_seq'::regclass)"),
    )
    description = Column(String, nullable=False, default="draft")
