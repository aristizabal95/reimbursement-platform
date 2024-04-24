from pydantic import BaseModel

class AddEvent(BaseModel):
    event_id: str
    user_id: str

class InvoiceDetail(BaseModel):
    reimbursment_id: str 
    invoice_id: str = None
    amnt: float
    vendor: str
    currency: str
