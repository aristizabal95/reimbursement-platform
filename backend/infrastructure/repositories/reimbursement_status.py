from backend.infrastructure.models.reimbursement_status import ReimbursementStatus
from backend.infrastructure.repositories.abstract import AbstractRepository


class ReimbursementStatusRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(ReimbursementStatus)
