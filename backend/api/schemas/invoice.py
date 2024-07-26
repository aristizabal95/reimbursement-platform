from datetime import datetime

from fastapi import Form, UploadFile
from pydantic import BaseModel


# Invoices can't be queried by image content, so the partial
# model must be created excluding that parameter
class InvoiceBase(BaseModel):
    reimbursement_id: int = Form(...)
    expense_id: int = Form(...)
    currency: str = Form(...)
    amount: float = Form(...)
    vendor: str = Form(...)
    description: str = Form("")


class InvoiceIn(InvoiceBase):
    image: UploadFile = Form(...)


class InvoiceOut(InvoiceBase):
    id: int
    expense: str
    created_at: datetime
    url: str
