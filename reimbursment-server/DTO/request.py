from pydantic import BaseModel
from fastapi import UploadFile, File
from typing import Annotated

class AddEvent(BaseModel):
    event_id: str
    user_id: str

class NewInvoice(BaseModel):
    reimbursment_id: str 
    invoice_id: str = None
    amnt: float
    vendor: str
    currency: str
    invoice: Annotated[UploadFile, File()] = None
