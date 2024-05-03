from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship

from backend.infrastructure.models.base import Base
from backend.infrastructure.models.base_model import BaseModel


class Invoice(Base, BaseModel):
    __tablename__ = "invoices"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('invoices_id_seq'::regclass)"),
    )
    user_id = Column(ForeignKey("users.id"), ForeignKey("users.id"))
    event_id = Column(ForeignKey("events.id"), ForeignKey("events.id"))
    url = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    currency = Column(String, nullable=False)
    vendor = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    expense_id = Column(ForeignKey("expenses.id"), ForeignKey("expenses.id"))
    description = Column(String)

    event = relationship("Event")
    expense = relationship("Expense")
    user = relationship("User")
