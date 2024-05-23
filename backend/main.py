import logging

import uvicorn
from fastapi import FastAPI

from backend.api.endpoints import (
    event,
    expense,
    invoice,
    reimbursement,
    user,
    user_event,
)
from backend.settings import middlewares

app = FastAPI(middleware=middlewares)

logger = logging.getLogger(__name__)

origins = ["http://localhost:3000"]

logger.info("Adding middleware!")

app.include_router(event.router, prefix="/events", tags=["events"])
app.include_router(expense.router, prefix="/expenses", tags=["expenses"])
app.include_router(invoice.router, prefix="/invoices", tags=["invoices"])
app.include_router(
    reimbursement.router, prefix="/reimbursements", tags=["reimbursements"]
)
app.include_router(user_event.router, prefix="/user-events", tags=["user-events"])
app.include_router(user.router, prefix="/users", tags=["users"])

if __name__ == "__main__":
    config = uvicorn.Config(
        "backend.main:app", port=8080, reload=True, log_config="backend/config.yml"
    )
    server = uvicorn.Server(config)
    server.run()
