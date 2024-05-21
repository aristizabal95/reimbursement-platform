import os

from boto3 import session
from fastapi import UploadFile

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
        self.PROJECT = "research-projects"
        self.INVOICE_PATH = "reimbursement-platform/receipts"

    def upload_file(self, reimbursement_id: int, image: UploadFile, **_):
        image_url = self.INVOICE_PATH + f"/{reimbursement_id}/{image.filename}"
        try:
            self.s3_client.upload_fileobj(image.file, self.PROJECT, image_url)
        except Exception as e:
            raise e
        return image_url

    def create_invoice(self, **kwargs):
        image_url = self.upload_file(**kwargs)
        kwargs["url"] = image_url
        del kwargs["image"]
        return self.invoice_repository.add(kwargs)

    def get_invoice(self, **filters):
        # image_url = f"reimbursement-platform/receipts/{invoice.filename}"
        # presigned_url = self.s3_client.generate_presigned_url('get_object', Params={'Bucket': 'research-projects', 'Key': image_url}, ExpiresIn=3600)
        # self.s3_client.download_file("research-projects", image_url, "asdasd.jpeg")
        return self.invoice_repository.get_by(**filters)

    def get_all_invoices(self):
        return self.invoice_repository.get_all()

    def update_invoice(self, invoice):
        return self.invoice_repository.edit(invoice)

    def delete_invoice(self, invoice_id):
        return self.invoice_repository.delete(invoice_id)
