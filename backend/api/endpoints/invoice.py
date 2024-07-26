from fastapi import Form, UploadFile

from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.invoice import InvoiceBase, InvoiceIn, InvoiceOut
from backend.api.schemas.partial import Partial
from backend.domain.services.invoice import InvoiceService


class InvoiceRouter(AbstractRouter):
    def __init__(self):
        super().__init__(InvoiceService(), InvoiceIn, Partial[InvoiceBase], InvoiceOut)

    def parse_image(self, file: UploadFile = Form(...)):
        return InvoiceService.parse_image(file)

    def _setup_routes(self):
        super()._setup_routes()

        @self.router.post("/parser")
        def parse_image(file: UploadFile = Form(...)):
            return self.parse_image(file)
