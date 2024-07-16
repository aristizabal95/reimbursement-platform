from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.reimbursement_status import (
    ReimbursementStatusRepository,
)


class ReimbursementStatusService(AbstractService):
    def __init__(self):
        super().__init__(ReimbursementStatusRepository())
