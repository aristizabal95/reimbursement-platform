from fastapi import FastAPI, File, Request, Depends
from contextlib import asynccontextmanager
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn.config
import dto.response as resp
from asgi_correlation_id import CorrelationIdMiddleware
from asgi_correlation_id.middleware import is_valid_uuid4
from asgi_correlation_id import correlation_id
import dto.request as req
from starlette.routing import Route
from uuid import uuid4
import logging
from infrastructure import sql
from datetime import datetime
from typing import List

FORMAT_DATES = "%b, %d %H:%M"

logger = logging.getLogger(__name__)
db = None
@asynccontextmanager
async def lifespan(app: FastAPI):
    global db
    db = sql.create_connection()
    yield
    logger.inf("Database connection close!")
    db.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000",] ,allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.add_middleware(CorrelationIdMiddleware, header_name='X-Request-ID', update_request_header=True, generator=lambda: uuid4().hex, validator=is_valid_uuid4, transformer=lambda a: a)


@app.exception_handler(Exception)
async def unicorn_exception_handler(request: Request, exc: Exception):
    logger.exception(exc.__str__)
    return JSONResponse(
        status_code=500,
        content={"message": f"Internal Error"},
    )

@app.post('/login')
async def login(form: req.Login) -> resp.Auth:
    user_info = sql.user_info(db, **form.dict())
    return resp.Auth(**user_info, accessToken="super random token")

@app.post("/event")
async def add_event(form: req.Event) -> dict[str, int]:
    return sql.add_event(db, **form.dict())

@app.post("/expense")
async def add_expenses(ee: List[req.Expense]):
    return [sql.add_expense(**e.dict()) for e in ee]
    
@app.get("/task-list")
async def task_list():
    return JSONResponse([])

@app.get("/task-detail/{id}")
async def task_detail(id: str):
    return JSONResponse([])

@app.get("/available-events/{userId}")
async def available_events(userId: str):
    # This should depned on user Id, so the event table should have a group column: all, (clientname)
    # And users belongs to groups...
    with db.cursor() as cur:
        cur.execute("SELECT id, title, budget FROM events WHERE ends_at >= %s", (datetime.now(), )) #is ends_at in UTC??
        return JSONResponse([{'id': v[0], 'title': v[1], 'budget': v[2]} for v in cur.fetchall()])

@app.get("/reimbursement/{user_id}")
async def reimbursement(user_id: int):
    return sql.get_reimbursement(db, user_id)

@app.post('/reimbursement')
async def reimbursement_post(form: req.Reimbursment):
    return sql.add_reimbursement(db, **form.dict())
    

@app.get('/reimbursment-list/{userId}')
async def invoice_list(userId: str):
    with db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

@app.post('/nvoice')
async def new_invoice(form: req.Invoice = Depends()):
    return JSONResponse("OK")

import uvicorn

if __name__ == '__main__':
    config = uvicorn.Config("main:app", port=8080, reload=True, log_level="info", log_config="config.yml")
    server = uvicorn.Server(config)
    server.run()
