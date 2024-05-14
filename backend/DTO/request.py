from dataclasses import dataclass
from pydantic import BaseModel
from fastapi import UploadFile, File, Form
import datetime
from typing import Optional

class Reimbursment(BaseModel):
    event_id: int
    user_id: int

@dataclass
class Invoice:
    id: str = None
    reimbursement_id: Optional[str] = Form(None)
    amount: str = Form(...)
    vendor: str = Form(...)
    currency: str = Form(...) 
    expense_id: int = Form(None)
    invoice: Optional[UploadFile] = File(None) #Now we have to deal with expense without a support
    url: Optional[str] = Form('')
    desc: Optional[str] = Form('')

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