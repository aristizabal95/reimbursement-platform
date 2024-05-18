from backend.infrastructure.models.expense import Expense
from backend.infrastructure.repositories.abstract import AbstractRepository


class ExpenseRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Expense)

    def get_all_expenses_by_event_id(self, event_id: int):
        instances = (
            self.session.query(self.model).filter(self.model.event_id == event_id).all()
        )
        return [instance.to_dict() for instance in instances]
