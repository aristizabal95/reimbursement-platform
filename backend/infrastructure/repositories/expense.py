from backend.infrastructure.models.expense import Expense
from backend.infrastructure.repositories.abstract import AbstractRepository


class ExpenseRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Expense)
