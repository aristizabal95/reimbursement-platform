from typing import Optional

from pydantic import BaseModel


class Invoice(BaseModel):
    id: Optional[int] = None
    expense_id: Optional[int] = None
    reimbursement_id: Optional[int] = None


class User(BaseModel):
    id: Optional[int] = None
    email: Optional[str] = None
    username: Optional[str] = None
    role: Optional[int] = None


class Reimbursement(BaseModel):
    id: Optional[int] = None
    status_id: Optional[int] = None
    # TODO: Set as time
    create_date: Optional[str] = None
    event_id: Optional[int] = None
    user_id: Optional[int] = None


class Expense(BaseModel):
    id: Optional[int] = None
    event_id: Optional[str] = None


class Event(BaseModel):
    id: Optional[int] = None
    center_of_costs: Optional[str] = None
    # TODO: Make a table Event_status with id and desc and link to this field
    status: Optional[bool] = None
