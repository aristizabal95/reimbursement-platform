from dataclasses import dataclass
from pydantic import BaseModel
from fastapi import UploadFile, File, Form
import datetime

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

    def dict_no_file(self):
        d = self.__dict__
        return {k: v for k, v in d.items() if k != 'invoice'}

class NewEvent(BaseModel):
    title: str
    center_of_costs: str
    budget: float
    end_dt: datetime.date
