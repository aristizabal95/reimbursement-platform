from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, text
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

    url = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    dte = Column(Date, nullable=False)
    currency = Column(String, nullable=False)
    vendor = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    expense_id = Column(ForeignKey("expenses.id"), ForeignKey("expenses.id"))
    description = Column(String)
    reimbursement_id = Column(ForeignKey("reimbursements.id"))

    reimbursement = relationship("Reimbursement")
    expense = relationship("Expense")
