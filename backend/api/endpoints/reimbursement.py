from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.partial import Partial
from backend.api.schemas.reimbursement import ReimbursementIn, ReimbursementOut
from backend.domain.services.reimbursement import ReimbursementService


class ReimbursementRouter(AbstractRouter):
    def __init__(self):
        super().__init__(
            ReimbursementService(),
            ReimbursementIn,
            Partial[ReimbursementIn],
            ReimbursementOut,
        )
