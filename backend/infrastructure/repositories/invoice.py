from backend.infrastructure.models.expense import Expense
from backend.infrastructure.models.invoice import Invoice
from backend.infrastructure.repositories.abstract import AbstractRepository


class InvoiceRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Invoice)

    def get_invoice_info(self, **filters):
        instances = (
            self.session.query(self.model, Expense)
            .join(Expense)
            .where(
                *[
                    getattr(self.model, name) == value
                    for name, value in filters.items()
                    if value is not None
                ]
            )
            .all()
        )
        result = []
        for invoice, expense in instances:
            result.append(
                {
                    "invoice_id": invoice.id,
                    "expense": expense.name,
                    "vendor": invoice.vendor,
                    "currency": invoice.currency,
                    "amount": invoice.amount,
                    "created_at": invoice.created_at,
                    "url": invoice.url,
                }
            )
        return result
