from sqlalchemy import bindparam

from backend.infrastructure.models.expense import Expense
from backend.infrastructure.models.invoice import Invoice
from backend.infrastructure.repositories.abstract import AbstractRepository


class InvoiceRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Invoice)

    def get_by(self, **filters):

        # Create a dictionary to hold our parameter bindings
        params = {}

        # Build the filter conditions
        conditions = []
        for name, value in filters.items():
            if value is not None:
                param_name = f"param_{name}"
                conditions.append(getattr(self.model, name) == bindparam(param_name))
                params[param_name] = value

        instances = (
            self.session.query(self.model, Expense)
            .join(Expense)
            .filter(*conditions)
            .params(params)
            .all()
        )
        result = []
        for invoice, expense in instances:
            result.append(
                {
                    "id": invoice.id,
                    "reimbursement_id": invoice.reimbursement_id,
                    "expense_id": invoice.expense_id,
                    "currency": invoice.currency,
                    "amount": invoice.amount,
                    "vendor": invoice.vendor,
                    "description": invoice.description,
                    "expense": expense.name,
                    "created_at": invoice.created_at,
                    "url": invoice.url,
                }
            )
        return result
