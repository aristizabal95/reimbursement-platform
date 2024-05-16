from fastapi import APIRouter, UploadFile

from backend.domain.services.invoice import InvoiceService

router = APIRouter()


@router.post("/invoice")
def create_invoice(invoice: UploadFile):
    invoice_service = InvoiceService()
    return invoice_service.create_invoice(invoice)


@router.get("/invoice")
def get_invoice(invoice_id: int):
    invoice_service = InvoiceService()
    return invoice_service.get_invoice(invoice_id)


@router.get("/invoices")
def get_all_invoices():
    invoice_service = InvoiceService()
    return invoice_service.get_all_invoices()


@router.get("/invoices-by-user")
def get_all_invoices_by_user_id(user_id: int):
    invoice_service = InvoiceService()
    return invoice_service.get_all_invoices_by_user_id(user_id)


@router.get("/invoices-by-event")
def get_all_invoices_by_event_id(event_id: int):
    invoice_service = InvoiceService()
    return invoice_service.get_all_invoices_by_event_id(event_id)


@router.put("/invoice")
def update_invoice(invoice: dict):
    invoice_service = InvoiceService()
    return invoice_service.update_invoice(invoice)


@router.delete("/invoice")
def delete_invoice(invoice_id: int):
    invoice_service = InvoiceService()
    return invoice_service.delete_invoice(invoice_id)
