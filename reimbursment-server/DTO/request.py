from dataclasses import dataclass
from pydantic import BaseModel
from fastapi import UploadFile, File, Form

class AddEvent(BaseModel):
    event_id: str
    user_id: str

@dataclass
class NewInvoice:
    reimbursment_id: str = Form(...)
    invoice_id: str = None
    amnt: str = Form(...)
    vendor: str = Form(...)
    currency: str = Form(...)
    invoice: UploadFile = File(...)
