from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from fastapi import Form, UploadFile
from pydantic import BaseModel


class Invoice(BaseModel):
    id: Optional[int] = None
    expense_id: Optional[int] = None
    reimbursement_id: Optional[int] = None


@dataclass
class InvoiceUpload:
    id: int = None
    reimbursement_id: int = Form(...)
    expense_id: int = Form(...)
    currency: str = Form(...)
    amount: float = Form(...)
    vendor: str = Form(...)
    description: str = Form("")
    image: UploadFile = Form(...)


class User(BaseModel):
    id: Optional[int] = None
    email: Optional[str] = None
    username: Optional[str] = None
    role_id: Optional[int] = None


class Reimbursement(BaseModel):
    id: Optional[int] = None
    status_id: Optional[int] = 1
    # TODO: Set as time
    create_date: Optional[str] = None
    event_id: Optional[int] = None
    user_id: Optional[int] = None


class ReimbursementInfo(BaseModel):
    reimbursement_id: int
    event_id: int
    username: str
    event: str
    currency: str
    status: str
    create_date: datetime


class Expense(BaseModel):
    id: Optional[int] = None
    event_id: Optional[str] = None


class Event(BaseModel):
    id: Optional[int] = None
    center_of_costs: Optional[str] = None
    # TODO: Make a table Event_status with id and desc and link to this field
    status: Optional[bool] = None


class UserEvent(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int] = None
    event_id: Optional[int] = None
    status: Optional[str] = None
