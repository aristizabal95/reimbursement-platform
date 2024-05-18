from fastapi import APIRouter, Depends, UploadFile

import backend.api.schema as sch
from backend.domain.services.invoice import InvoiceService

router = APIRouter()


@router.post("/invoices")
def create_invoice(invoice: UploadFile):
    invoice_service = InvoiceService()
    return invoice_service.create_invoice(invoice)


@router.get("/invoices")
def get_invoice(filters: sch.Invoice = Depends()):
    invoice_service = InvoiceService()
    return invoice_service.get_invoice(**filters.model_dump())


@router.put("/invoices")
def update_invoice(invoice: dict):
    invoice_service = InvoiceService()
    return invoice_service.update_invoice(invoice)


@router.delete("/invoices")
def delete_invoice(invoice_id: int):
    invoice_service = InvoiceService()
    return invoice_service.delete_invoice(invoice_id)
