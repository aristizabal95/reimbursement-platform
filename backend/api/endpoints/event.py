from fastapi import Request, Depends
from fastapi.responses import JSONResponse
import datetime
import dto.request as req
import dto.response as resp
from infrastructure import sql
from typing import List


async def add_event(form: req.Event, r: Request) -> dict[str, int]:
    return sql.add_event(r.state.db, **form.model_dump())

async def available_events(user_id: str, r: Request):
    # This should depned on user Id, so the event table should have a group column: all, (clientname)
    # And users belongs to groups...
    with r.state.db.cursor() as cur:
        cur.execute("SELECT id, title, budget FROM events WHERE ends_at >= %s", (datetime.now(), )) #is ends_at in UTC??
        return JSONResponse([{'id': v[0], 'title': v[1], 'budget': v[2]} for v in cur.fetchall()])

async def add_expenses(ee: List[req.Expense], r: Request):
    return [sql.add_expense(**e.model_dump()) for e in ee]