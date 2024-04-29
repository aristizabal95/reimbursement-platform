from fastapi import FastAPI, File, Request, Depends
from contextlib import asynccontextmanager
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn.config
import DTO.response as resp
from asgi_correlation_id import CorrelationIdMiddleware
from asgi_correlation_id.middleware import is_valid_uuid4
from asgi_correlation_id import correlation_id
import DTO.request as req
import psycopg2
import os
from uuid import uuid4
import logging

FORMAT_DATES = "%b, %d %H:%M"

logger = logging.getLogger(__name__)

db = psycopg2.connect(user=os.environ["REIMBURSMENT_DB"],
                 password=os.environ["REIMBURSMENT_DB_PASS"],
                 dbname='postgres',
                 host='reimbursement-platform.cphyvakixbqr.us-east-1.rds.amazonaws.com',
                 port=5432)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    CorrelationIdMiddleware,
    header_name='X-Request-ID',
    update_request_header=True,
    generator=lambda: uuid4().hex,
    validator=is_valid_uuid4,
    transformer=lambda a: a,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    db.close()


@app.exception_handler(Exception)
async def unicorn_exception_handler(request: Request, exc: Exception):
    logger.error(exc.__str__)
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. There goes a rainbow..."},
    )

@app.post("/add-event")
async def add_event(form: req.NewEvent):
    with db.cursor() as cur:
        cur.execute("""
                    INSERT INTO events
                    (title, center_of_costs, budget, status, end_dt)""",
                    (form.title, form.center_of_costs, form.budget, "active", 
                     form.end_dt)
        )
        db.commit()


@app.get("/task-list")
async def task_list():
    return JSONResponse([])

@app.get("/task-detail/{id}")
async def task_detail(id: str):
    return JSONResponse([])

@app.get("/available-events/{userId}")
async def available_events(userId: str):
    with db.cursor() as cur:
        cur.execute("SELECT event_id FROM events WHERE userID=%s", (userId, ))
        return JSONResponse([cur.fetchall()])

@app.get("/my-event-list/{userId}")
async def my_event_list(userId: str):
    return JSONResponse([])

@app.post('/new-reimbursment')
async def new_reimbursment(form: req.AddEvent):
    with db.cursor() as cur:
        cur.execute("SELECT event_id FROM WHERE user_id=%s", (form.user_id, ))
        user_events = set([el for el in cur.fetchall()])
        if form.event_id in user_events:
            return "You already have this event! Fool me once.."
        # We need tot add an status. And probably a reimbursment id.. or use this id
        cur.execute("INSERT INTO user_events (user_id, event_id) VALUES (%s, %s)", (form.user_id, form.event_id))
    return "OK"

@app.get('/reimbursment-list/{userId}')
async def invoice_list(userId: str):
    with db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

@app.post('/new-invoice')
async def new_invoice(form: req.NewInvoice = Depends()):
    return JSONResponse("OK")

import uvicorn

if __name__ == '__main__':
    config = uvicorn.Config("main:app", port=8080, log_level="info", log_config="config.yml")
    server = uvicorn.Server(config)
    server.run()
