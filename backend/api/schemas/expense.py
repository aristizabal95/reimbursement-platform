from typing import List, Optional

from pydantic import BaseModel


class ExpenseIn(BaseModel):
    event_id: int
    budget: int
    description: Optional[str] = None
    name: str


class ExpenseOut(ExpenseIn):
    id: int


class ExpenseBatchIn(BaseModel):
    expenses: List[ExpenseIn]
