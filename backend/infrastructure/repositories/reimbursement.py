from backend.infrastructure.models.reimbursement import Reimbursement
from backend.infrastructure.repositories.abstract import AbstractRepository


class ReimbursementRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Reimbursement)

    def get_all_reimbursements_by_invoice_id(self, invoice_id: int):
        instances = (
            self.session.query(self.model)
            .filter(self.model.invoice_id == invoice_id)
            .all()
        )
        return [instance.to_dict() for instance in instances]

    def get_all_reimbursements_by_status(self, status: bool):
        instances = (
            self.session.query(self.model).filter(self.model.status == status).all()
        )
        return [instance.to_dict() for instance in instances]
