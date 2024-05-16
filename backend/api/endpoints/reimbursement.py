from fastapi import APIRouter, Depends

import backend.api.schema as sch
from backend.domain.services.reimbursement import ReimbursementService

router = APIRouter()


@router.post("/reimbursements")
def create_reimbursement(reimbursement: dict):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.create_reimbursement(reimbursement)


@router.get("/reimbursements")
def get_reimbursement(filters: sch.Reimbursement = Depends()):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.get_reimbursement(**filters.model_dump())


@router.put("/reimbursements")
def update_reimbursement(reimbursement: dict):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.update_reimbursement(reimbursement)


@router.delete("/reimbursements")
def delete_reimbursement(reimbursement_id: int):
    reimbursement_service = ReimbursementService()
    return reimbursement_service.delete_reimbursement(reimbursement_id)
