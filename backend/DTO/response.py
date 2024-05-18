from pydantic import BaseModel
from datetime import datetime

class UserEvent(BaseModel):
    id:str
    event_id: str
    event_name: str
    create_date: str
    status: str
    total_amount: float
    currency: str

class Auth(BaseModel):
    user_id: int
    accessToken: str
    role_id: int

class Expense(BaseModel):
    id: int
    name: str

class Reimbursement(BaseModel):
    id: int
    event_name: str
    create_date: datetime 
    status: str
    currency: str

class Invoice(BaseModel):
    id: int
    vendor: str 
    amount: float 
    currency: str