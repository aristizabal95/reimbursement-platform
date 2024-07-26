from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.reimbursement import ReimbursementRepository


class ReimbursementService(AbstractService):
    def __init__(self):
        super().__init__(ReimbursementRepository())

    def create(self, reimbursement):
        # TODO: Check the user don't have already a reimbursement for this event!
        super().create(reimbursement)
