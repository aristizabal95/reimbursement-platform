from datetime import datetime

from pydantic import BaseModel


class EventIn(BaseModel):
    title: str
    center_of_costs: str
    budget: int
    is_active: bool
    starts_at: datetime
    ends_at: datetime
    currency: str


class EventOut(EventIn):
    id: int
    created_at: datetime
