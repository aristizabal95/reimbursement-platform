from fastapi import Request, Depends, APIRouter
from fastapi.responses import JSONResponse
import dto.request as req
from infrastructure import sql


async def reimbursement(user_id: int, r: Request):
    return sql.get_reimbursement(r.state.db, user_id)

async def add_reimbursement(form: req.Reimbursment, r: Request):
    return sql.add_reimbursement(r.state.db, **form.model_dump())
    
async def invoice(userId: str, r: Request):
    with r.state.db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

async def new_invoice(r: Request, form: req.Invoice = Depends()):
    return JSONResponse("OK")