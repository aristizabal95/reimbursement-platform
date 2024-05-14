from fastapi import Request, Depends
import dto.request as req
import dto.response as res
from infrastructure import sql
from typing import List, Union
import logging

logger = logging.getLogger(__name__)

async def user_reimbursements(user_id: str, r: Request) -> List[Union[res.Reimbursement, None]]:
    result = await sql.user_reimbursement(r.app.state.db, user_id)
    return [res.Reimbursement(**r) for r in result if len(result) != 0]

async def add_reimbursements(form: req.Reimbursment, r: Request):
    result = await sql.add_reimbursement(r.app.state.db, **form.model_dump())
    return result

async def get_invoices(reimb_id: int, r: Request) -> List[res.Invoice]:
    result = await sql.get_invoices(r.app.state.db, reimb_id)
    return [res.Invoice(**r) for r in result if len(result) != 0]

async def add_invoices(r: Request, form: req.Invoice = Depends()):
    #TODO: create function to add file to s3... form.url = s3.save_invoice(form) 
    result = await sql.add_invoices(r.app.state.db, form)
    return result
