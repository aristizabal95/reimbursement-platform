from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.domain.services.reimbursement import ReimbursementService

router = APIRouter()


@router.post("/reimbursement")
def create_reimbursement(reimbursement: dict):
    reimbursement_service = ReimbursementService()
    reimbursement_service.create_reimbursement(reimbursement)
    return JSONResponse(content={"message": "Reimbursement created successfully"})


@router.get("/reimbursement")
def get_reimbursement(reimbursement_id: int):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.get_reimbursement(reimbursement_id)


@router.get("/reimbursements")
def get_all_reimbursements():
    reimbursement_service = ReimbursementService()
    return reimbursement_service.get_all_reimbursements()


@router.get("/reimbursements-by-invoice")
def get_all_reimbursements_by_invoice(invoice_id: int):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.get_all_reimbursements_by_invoice_id(invoice_id)


@router.get("/reimbursements-by-status")
def get_all_reimbursements_by_status(status: bool):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.get_all_reimbursements_by_status(status)


@router.put("/reimbursement")
def update_reimbursement(reimbursement: dict):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.update_reimbursement(reimbursement)


@router.delete("/reimbursement")
def delete_reimbursement(reimbursement_id: int):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.delete_reimbursement(reimbursement_id)
