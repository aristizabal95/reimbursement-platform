from backend.infrastructure.repositories.reimbursement import \
    ReimbursementRepository


class ReimbursementService:
    def __init__(self):
        self.reimbursement_repository = ReimbursementRepository()

    def create_reimbursement(self, reimbursement):
        return self.reimbursement_repository.add(reimbursement)

    def get_reimbursement(self, reimbursement_id):
        return self.reimbursement_repository.get_by_id(reimbursement_id)

    def get_all_reimbursements(self):
        return self.reimbursement_repository.get_all()

    def get_all_reimbursements_by_invoice_id(self, invoice_id):
        return self.reimbursement_repository.get_all_reimbursements_by_invoice_id(
            invoice_id
        )

    def get_all_reimbursements_by_status(self, status):
        return self.reimbursement_repository.get_all_reimbursements_by_status(status)

    def update_reimbursement(self, reimbursement):
        return self.reimbursement_repository.edit(reimbursement)

    def delete_reimbursement(self, reimbursement_id):
        return self.reimbursement_repository.delete(reimbursement_id)
