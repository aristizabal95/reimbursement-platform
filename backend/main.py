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
import psycopg2
import os
from uuid import uuid4
import logging
from datetime import datetime
from typing import List

FORMAT_DATES = "%b, %d %H:%M"

logger = logging.getLogger(__name__)

db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db
    try:
        db = psycopg2.connect(user=os.environ["POSTGRES_USERNAME"],
                    password=os.environ["POSTGRES_PASSWORD"],
                    dbname=os.environ["POSTGRES_DBNAME"],
                    host=os.environ["POSTGRES_HOST"],                 
                    port=os.environ["POSTGRES_PORT"])
    except Exception as e:
        logger.exception(e)
        raise e
    logger.info("Create connection to DB")
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
    try:
        with db.cursor() as cur:
            cur.execute("SELECT id, role_id FROM users WHERE username = %s", (form.username, ))
            result = [{'user_id': v[0], 'role_id': v[1]} for v in cur.fetchall()]
            assert len(result) == 1
    except Exception as e:
        logger.error(e)
        raise e
    logger.info(f"User {result[0]['user_id']} logged!")
    return resp.Auth(**result[0], accessToken="super random token")


@app.post("/event")
async def add_event(form: req.Event) -> dict[str, int]:
    with db.cursor() as cur:
        try:
            cur.execute("""
                        INSERT INTO events
                        (title, center_of_costs, budget, currency, status, ends_at)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;""",
                        (form.title, form.center_of_costs, form.budget, form.currency, "active", 
                        form.ends_at)
            )
            event_id = cur.fetchone()[0]
            db.commit()
            logger.info(f"Event add id: {event_id}")
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise
    return {'id': event_id}

@app.post("/expense")
async def add_expenses(ee: List[req.Expense]):
    logger.info(ee)
    with db.cursor() as cur:
        expense_id = []
        try:
            for e in ee:
                cur.execute("""
                    INSERT INTO expenses
                            (event_id, name, budget, description)
                            VALUES (%s, %s, %s, %s)
                    RETURNING id;
                """,
                (e.event_id, e.name, e.budget, e.desc))
                expense_id.append(cur.fetchone()[0])
                logger.info(f"Expense {expense_id[-1]} added to event {e.event_id}") #event_id is an input from the user, should this generate LOG4JS vulnerabilities?
            db.commit()
        except:
            db.rollback()
            logger.exception(e)
            raise
    return {'id': expense_id}

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

@app.get("/my-event-list/{user_id}")
async def my_event_list(user_id: str):
    with db.cursor() as cur:
        try:
            cur.execute("""
                        SELECT e.title, r.created_at, s.description, e.currency
                        FROM reimbursements_v2 r 
                        JOIN events e on e.id = r.event_id
                        JOIN status s on s.id = r.status  
                        WHERE r.user_id=%s and r.status < 5
                        """,
                        (user_id))
            colnames = ['event_name', 'created_date', 'status', 'currency']
            res = [{k: v for k, v in zip(colnames, vv)} for vv in cur.fetchall()]
        except Exception as e:
            logger.exception(e)
            raise e
    return res

@app.post('/reimbursement')
async def new_reimbursement(form: req.Reimbursment):
    with db.cursor() as cur:
        try:
            cur.execute("SELECT event_id FROM reimbursements_v2 WHERE user_id=%s", (form.user_id, ))
            user_events = set([el for el in cur.fetchall()])
            if form.event_id in user_events:
                return "You already have this event! Fool me once.."
            cur.execute("INSERT INTO reimbursements_v2 (event_id, user_id, status) VALUES (%s, %s, %s) RETURNING id;",
                        (form.event_id, form.user_id, 1))
            reimb_id = cur.fetchone()
            db.commit()
            logger.info(f"New reimbursement {reimb_id} added to user {form.user_id}")
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise e
    return {"reimb_id": reimb_id}

@app.get('/reimbursment-list/{userId}')
async def invoice_list(userId: str):
    with db.cursor() as cur:
        cur.execute("SELECT * FROM invoices WHERE user_id=%s", (userId, ))
        return [el for el in cur.fetchall()]

@app.post('/new-invoice')
async def new_invoice(form: req.Invoice = Depends()):
    return JSONResponse("OK")

import uvicorn

if __name__ == '__main__':
    config = uvicorn.Config("main:app", port=8080, reload=True, log_level="info", log_config="config.yml")
    server = uvicorn.Server(config)
    server.run()
