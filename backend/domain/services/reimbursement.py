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

async def invoice(userId: str, r: Request):
    pass

async def new_invoice(r: Request, form: req.Invoice = Depends()):
    pass