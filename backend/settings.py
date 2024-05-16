from fastapi import FastAPI, Request
from starlette.middleware import Middleware
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from asgi_correlation_id import CorrelationIdMiddleware
from asgi_correlation_id import correlation_id
from uuid import UUID, uuid4
from infrastructure import sql
from contextlib import asynccontextmanager
import logging
import boto3
import os

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db = await sql.create_connection()
    logger.info("DB connected!")
    s3 = boto3.session.Session(aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"], 
                             aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"], aws_session_token=os.environ["AWS_SESSION_TOKEN"])
    app.state.s3 = s3.client("s3")
    logger.info("DB connected!")
    yield
    logger.info("DB closed")
    app.state.db.close()

middleware = [
    Middleware(CORSMiddleware, allow_origins=["http://localhost:3000",], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]),
    Middleware(CorrelationIdMiddleware, header_name='X-Request-ID', update_request_header=True, generator=lambda: uuid4().hex, validator=lambda uuid_: bool(UUID(uuid_, version=4)), transformer=lambda a: a)
]

def unicorn_exception_handler(r: Request, exc: Exception):
    logger.exception(exc.__str__)
    return JSONResponse(status_code=500, content={"message": f"Internal Error"})