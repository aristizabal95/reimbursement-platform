from sqlalchemy import Column, ForeignKey, Integer, text
from sqlalchemy.orm import relationship

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class UserEvent(Base, BaseModel):
    __tablename__ = "user_events"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('user_events_id_seq'::regclass)"),
    )
    user_id = Column(ForeignKey("users.id"), ForeignKey("users.id"), nullable=False)
    event_id = Column(ForeignKey("events.id"), ForeignKey("events.id"), nullable=False)
    status = Column(Integer, nullable=True)

    event = relationship("Event")
    user = relationship("User")
