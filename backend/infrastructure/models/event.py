from sqlalchemy import Boolean, Column, DateTime, Integer, String, text

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class Event(BaseModel, Base):
    __tablename__ = "events"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('events_id_seq'::regclass)"),
    )
    title = Column(String)
    center_of_costs = Column(String)
    budget = Column(Integer, nullable=False)
    is_active = Column(Boolean, nullable=False)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    ends_at = Column(DateTime)
    currency = Column(Integer, nullable=False)
