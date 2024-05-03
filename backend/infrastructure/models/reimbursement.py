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
    invoice_id = Column(ForeignKey("invoices.id"), ForeignKey("invoices.id"))
    status = Column(Integer, nullable=False)
    create_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    description = Column(String)

    invoice = relationship("Invoice")
