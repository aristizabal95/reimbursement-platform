from fastapi import Request, Depends, APIRouter
from fastapi.responses import JSONResponse
from datetime import datetime
import dto.request as req
import dto.response as resp
from infrastructure import sql
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/event")
async def add_event(form: req.Event, r: Request) -> dict[str, int]:
    result = await sql.add_event(r.app.state.db, **form.model_dump())
    return result

@router.get("/events/{user_id}")
async def available_events(user_id: str, r: Request):
    # This should depned on user Id, so the event table should have a group column: all, (clientname)
    # And users belongs to groups...
    with r.app.state.db.cursor() as cur:
        cur.execute("SELECT id, title, budget FROM events WHERE ends_at >= %s", (datetime.now(), )) #is ends_at in UTC??
        return JSONResponse([{'id': v[0], 'title': v[1], 'budget': v[2]} for v in cur.fetchall()])

@router.post("/expenses")
async def add_expenses(ee: List[req.Expense], r: Request):
    result = await [sql.add_expense(r.app.state.db, **e.model_dump()) for e in ee]
    return result
