from backend.infrastructure.repositories.invoice import InvoiceRepository


class InvoiceService:
    def __init__(self):
        self.invoice_repository = InvoiceRepository()

    def create_invoice(self, invoice):
        return self.invoice_repository.add(invoice)

    def get_invoice(self, invoice_id):
        return self.invoice_repository.get_by_id(invoice_id)

    def get_all_invoices(self):
        return self.invoice_repository.get_all()

    def get_all_invoices_by_user_id(self, user_id):
        return self.invoice_repository.get_all_invoices_by_user_id(user_id)

    def get_all_invoices_by_event_id(self, event_id):
        return self.invoice_repository.get_all_invoices_by_event_id(event_id)

    def update_invoice(self, invoice):
        return self.invoice_repository.edit(invoice)

    def delete_invoice(self, invoice_id):
        return self.invoice_repository.delete(invoice_id)
