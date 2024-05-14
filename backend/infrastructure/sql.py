import logging
import psycopg2
from psycopg2._psycopg import connection
import os
import datetime

logger = logging.getLogger(__name__)

async def create_connection():
    try:
        db = psycopg2.connect(user=os.environ["POSTGRES_USERNAME"],
                    password=os.environ["POSTGRES_PASSWORD"],
                    dbname=os.environ["POSTGRES_DBNAME"],
                    host=os.environ["POSTGRES_HOST"],                 
                    port=os.environ["POSTGRES_PORT"])
    except Exception as e:
        logger.exception(e)
        raise e
    return db

async def user_info(db: connection, username: str, **_):
    with db.cursor() as cur:
        try:
            cur.execute("SELECT id, role_id FROM users WHERE username = %s", (username, ))
            info = cur.fetchone()
            assert info != None
        except AssertionError as e:
            logger.exception("No data found in the db for given user!")
            db.rollback()
            raise e
        except Exception as e:
            logger.exception(e)
            db.rollback()
            raise e
    logger.info(f"User {info[0]} logged!")
    return {'user_id': info[0], 'role_id': info[1]}

async def add_event(db: connection, title: str, center_of_costs: str, budget: float, currency: str, ends_at: datetime.date, status: str = "active", **_) -> int:
    with db.cursor() as cur:
        try:
            cur.execute("""
                        INSERT INTO events
                        (title, center_of_costs, budget, currency, status, ends_at)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;""",
                        (title, center_of_costs, budget, currency, status, 
                        ends_at)
            )
            event_id = cur.fetchone()[0]
            db.commit()
            logger.info(f"Event add id: {event_id}")
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise
    return {"event_id": event_id}

async def add_expense(db: connection, event_id: int, name: str, budget: float, desc: str, **_) -> dict:
    with db.cursor() as cur:
        try:
            cur.execute("""
                INSERT INTO expenses
                        (event_id, name, budget, description)
                        VALUES (%s, %s, %s, %s)
                RETURNING id;
            """,
            (event_id, name, budget, desc))
            expense_id = cur.fetchone()
            logger.info(f"Expense {expense_id} added to event {event_id}")
            db.commit()
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise
    return {"expense_id": expense_id}

async def user_reimbursement(db: connection, user_id: str, **_):
    with db.cursor() as cur:
        try:
            cur.execute("""
                        SELECT r.id, e.title, r.create_date, s.description, e.currency
                        FROM reimbursements r 
                        JOIN events e on e.id = r.event_id
                        JOIN reimbursement_status s on s.id = r.status_id  
                        WHERE r.user_id=%s and r.status_id < 5
                        """,
                        (user_id, ))
            reimb_info = cur.fetchall()
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise e
        colnames = ['id', 'event_name', 'create_date', 'status', 'currency']
        return [{k: v for k, v in zip(colnames, vv)} for vv in reimb_info if len(reimb_info) != 0]

async def add_reimbursement(db: connection, event_id: int, user_id: int, **_):
    with db.cursor() as cur:
        try:
            cur.execute("SELECT id FROM reimbursements WHERE user_id=%s and event_id=%s", (user_id, event_id))
            reimbursment = [el for el in cur.fetchall()]
            if len(reimbursment) != 0:
                return {"reimb_id": reimbursment[0][0]}
            cur.execute("INSERT INTO reimbursements (event_id, user_id, status_id, description) VALUES (%s, %s, %s, %s) RETURNING id;",
                        (event_id, user_id, 1, ''))
            reimb_id = cur.fetchone()
            db.commit()
            logger.info(f"New reimbursement {reimb_id} added to user {user_id}")
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise e
    return {"reimb_id": reimb_id}

async def get_expenses_by_reimbursement(db: connection, reimb_id: int):
    with db.cursor() as cur:
        try:
            cur.execute("""
                        select ex.id, ex.name from expenses ex
                        where ex.event_id = 
                        (select r.event_id from reimbursements r where r.id=%s)
                        """, 
                        (reimb_id, ))
            ee = [e for e in cur.fetchall()]
        except Exception as e:
            db.rollback()
            logger.exception(e)
            raise e
        return [{"id": e[0], 'name': e[1]} for e in ee] if len(ee) != 0 else []
    