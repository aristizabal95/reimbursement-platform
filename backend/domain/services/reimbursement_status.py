from backend.infrastructure.repositories.reimbursement_status import (
    ReimbursementStatusRepository,
)


class ReimbursementStatusService:
    def __init__(self):
        self.reimbursement_status = ReimbursementStatusRepository()

    def create_status(self, status: dict):
        return self.reimbursement_status.add(status)

    def get_status(self, status_id: int):
        return self.reimbursement_status.get_by_id(status_id)

    def get_all_status(self):
        return self.reimbursement_status.get_all()

    def update_status(self, status: dict):
        return self.reimbursement_status.edit(status)

    def delete_status(self, status_id: int):
        return self.reimbursement_status.delete(status_id)
