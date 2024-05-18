import os

from boto3 import session

from backend.infrastructure.repositories.invoice import InvoiceRepository


class InvoiceService:
    def __init__(self):
        self.invoice_repository = InvoiceRepository()
        self.aws_access_key = os.environ.get("AWS_ACCESS_KEY")
        self.aws_secret_access_key = os.environ.get("AWS_SECRET_KEY")
        self.aws_session_token = os.environ.get("AWS_SECRET_TOKEN")
        self.s3_session = session.Session(
            aws_access_key_id=self.aws_access_key,
            aws_secret_access_key=self.aws_secret_access_key,
            aws_session_token=self.aws_session_token,
        )
        self.s3_client = self.s3_session.client("s3")

    def create_invoice(self, invoice):
        try:
            self.s3_client.upload_fileobj(
                invoice.file,
                "research-projects",
                f"reimbursement-platform/receipts/{invoice.filename}",
            )
        except Exception as e:
            print(e)
        # image_url = f"reimbursement-platform/receipts/{invoice.filename}"
        # presigned_url = self.s3_client.generate_presigned_url('get_object', Params={'Bucket': 'research-projects', 'Key': image_url}, ExpiresIn=3600)
        # self.s3_client.download_file("research-projects", image_url, "asdasd.jpeg")
        return self.invoice_repository.add(invoice)

    def get_invoice(self, **filters):
        return self.invoice_repository.get_by(**filters)

    def get_all_invoices(self):
        return self.invoice_repository.get_all()

    def update_invoice(self, invoice):
        return self.invoice_repository.edit(invoice)

    def delete_invoice(self, invoice_id):
        return self.invoice_repository.delete(invoice_id)
