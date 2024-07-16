from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.expense import ExpenseRepository


class ExpenseService(AbstractService):
    def __init__(self):
        super().__init__(ExpenseRepository())
