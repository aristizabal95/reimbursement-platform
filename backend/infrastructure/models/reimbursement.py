from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class Reimbursement(Base, BaseModel):
    __tablename__ = "reimbursements"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('reimbursements_id_seq'::regclass)"),
    )
    user_id = Column(ForeignKey("users.id"), ForeignKey("users.id"))
    event_id = Column(ForeignKey("events.id"), ForeignKey("events.id"))
    status_id = Column(
        ForeignKey("reimbursement_status.id"),
        ForeignKey("reimbursement_status.id"),
        default=1,
    )
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    description = Column(String)

    user = relationship("User")
    event = relationship("Event")
