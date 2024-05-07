from dataclasses import dataclass
from pydantic import BaseModel
from fastapi import UploadFile, File, Form
import datetime

class Reimbursment(BaseModel):
    event_id: int
    user_id: int

@dataclass
class Invoice:
    reimbursment_id: str = Form(...)
    invoice_id: str = None
    amnt: str = Form(...)
    vendor: str = Form(...)
    currency: str = Form(...)
    invoice: UploadFile = File(...)

    def dict_no_file(self):
        d = self.__dict__
        return {k: v for k, v in d.items() if k != 'invoice'}

class Event(BaseModel):
    title: str
    center_of_costs: str
    budget: float
    currency: str
    ends_at: datetime.date

class Expense(BaseModel):
    event_id: int
    name: str
    budget: float
    desc: str

class Login(BaseModel):
    username: str