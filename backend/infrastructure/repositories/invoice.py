from backend.infrastructure.models.invoice import Invoice
from backend.infrastructure.repositories.abstract import AbstractRepository


class InvoiceRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Invoice)

    def get_all_invoices_by_user_id(self, user_id: int):
        instances = (
            self.session.query(self.model).filter(self.model.user_id == user_id).all()
        )
        return [instance.to_dict() for instance in instances]

    def get_all_invoices_by_event_id(self, event_id: int):
        instances = (
            self.session.query(self.model).filter(self.model.event_id == event_id).all()
        )
        return [instance.to_dict() for instance in instances]
