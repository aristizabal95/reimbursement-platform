from backend.infrastructure.repositories.reimbursement import ReimbursementRepository


class ReimbursementService:
    def __init__(self):
        self.reimbursement_repository = ReimbursementRepository()

    def create_reimbursement(self, reimbursement):
        # TODO: Check the user don't have already a reimbursement for this event!
        return self.reimbursement_repository.add(reimbursement)

    def get_reimbursement(self, **filters):
        return self.reimbursement_repository.get_reimbursements_info(**filters)

    def update_reimbursement(self, reimbursement):
        return self.reimbursement_repository.edit(reimbursement)

    def delete_reimbursement(self, reimbursement_id):
        return self.reimbursement_repository.delete(reimbursement_id)
