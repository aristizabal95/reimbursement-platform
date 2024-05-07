from fastapi import Request, Depends, APIRouter
from fastapi.responses import JSONResponse
import dto.request as req
from infrastructure import sql
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/reimbursement/{user_id}")
async def reimbursement(user_id: int, r: Request):
    return sql.get_reimbursement(r.state.db, user_id)

@router.post("/reimbursement")
async def add_reimbursement(form: req.Reimbursment, r: Request):
    return sql.add_reimbursement(r.state.db, **form.model_dump())

@router.get("/invoice/{user_id}")    
async def invoice(userId: str, r: Request):
    with r.state.db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

@router.post("/invoice")
async def new_invoice(r: Request, form: req.Invoice = Depends()):
    logger.info(form.dict_no_file())
    return JSONResponse("OK")