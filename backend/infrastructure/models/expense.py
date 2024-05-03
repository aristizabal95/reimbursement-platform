from sqlalchemy import Column, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class Expense(Base, BaseModel):
    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('expenses_id_seq'::regclass)"),
    )
    event_id = Column(ForeignKey("events.id"), ForeignKey("events.id"))
    name = Column(String)
    budget = Column(Integer, nullable=False)
    description = Column(String)

    event = relationship("Event")
