import base64
import logging
import os

import requests
from boto3 import session
from botocore.client import Config
from fastapi import UploadFile

from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.invoice import InvoiceRepository

logger = logging.getLogger(__name__)


class InvoiceService(AbstractService):
    def __init__(self):
        super().__init__(InvoiceRepository())
        # These variables could live somewhere else. Breaking single responsibility principle
        self.aws_access_key = os.environ.get("AWS_ACCESS_KEY")
        self.aws_secret_access_key = os.environ.get("AWS_SECRET_KEY")
        self.aws_session_token = os.environ.get("AWS_SECRET_TOKEN")
        self.s3_session = session.Session(
            aws_access_key_id=self.aws_access_key,
            aws_secret_access_key=self.aws_secret_access_key,
            aws_session_token=self.aws_session_token,
        )
        self.s3_client = self.s3_session.client(
            "s3", config=Config(signature_version="s3v4", region_name="us-east-2")
        )
        self.PROJECT = "research-projects"
        self.INVOICE_PATH = "reimbursement-platform/receipts"

    # TODO: This could probably live somewhere else. Breaking single responsibility principle
    def __upload_file(self, reimbursement_id: int, image: UploadFile, **_):
        # TODO: Remove this vulnerability!!
        image_url = self.INVOICE_PATH + f"/{reimbursement_id}/{image.filename}"
        # TODO: Check if this url is in the db before uploading
        try:
            self.s3_client.upload_fileobj(image.file, self.PROJECT, image_url)
        except Exception as e:
            raise e
        return image_url

    # TODO: This could probably live somewhere else. Breaking single responsibility principle
    @classmethod
    def parse_image(self, image: UploadFile, **_):
        b64_image = base64.b64encode(image.file.read()).decode("utf-8")
        response = requests.post(
            # This should be a configurable variable
            "http://18.232.81.55:8003/parser/extract",
            json={"receipt_base64": b64_image},
        )
        return response.json()

    def create(self, **kwargs):  # TODO: Harmonize signature
        image_url = self.__upload_file(**kwargs)
        kwargs["url"] = image_url
        del kwargs["image"]
        return self.repository.add(kwargs)

    def get(self, **filters):
        results = self.repository.get_by(**filters)
        for result in results:
            try:
                result["url"] = self.s3_client.generate_presigned_url(
                    "get_object",
                    Params={"Bucket": "research-projects", "Key": result["url"]},
                    ExpiresIn=3600,
                )
            except Exception as e:
                logger.exception(e)
        return results
