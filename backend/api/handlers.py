from fastapi import Request, Depends
from fastapi.responses import JSONResponse
import datetime
import dto.request as req
import dto.response as resp
from infrastructure import sql
from typing import List


async def login(form: req.Login, r: Request) -> resp.Auth:
    user_info = sql.user_info(r.state.db, **form.model_dump())
    return resp.Auth(**user_info, accessToken="super random token")

async def add_event(form: req.Event, r: Request) -> dict[str, int]:
    return sql.add_event(r.state.db, **form.model_dump())

async def add_expenses(ee: List[req.Expense], r: Request):
    return [sql.add_expense(**e.model_dump()) for e in ee]
    
async def get_task():
    return JSONResponse([])

async def task_detail(id: str):
    return JSONResponse([])

async def available_events(userId: str, r: Request):
    # This should depned on user Id, so the event table should have a group column: all, (clientname)
    # And users belongs to groups...
    with r.state.db.cursor() as cur:
        cur.execute("SELECT id, title, budget FROM events WHERE ends_at >= %s", (datetime.now(), )) #is ends_at in UTC??
        return JSONResponse([{'id': v[0], 'title': v[1], 'budget': v[2]} for v in cur.fetchall()])

async def reimbursement(user_id: int, r: Request):
    return sql.get_reimbursement(r.state.db, user_id)

async def reimbursement_post(form: req.Reimbursment, r: Request):
    return sql.add_reimbursement(r.state.db, **form.model_dump())
    
async def invoice_list(userId: str, r: Request):
    with r.state.db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

async def new_invoice(r: Request, form: req.Invoice = Depends()):
    return JSONResponse("OK")
