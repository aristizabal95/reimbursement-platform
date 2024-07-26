from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ReimbursementIn(BaseModel):
    user_id: int
    event_id: int
    status_id: int
    description: Optional[str] = None


class ReimbursementOut(ReimbursementIn):
    id: int
    username: str
    currency: str
    event: str
    status: str
    created_at: datetime
