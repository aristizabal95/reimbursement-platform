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

event_router = event.EventRouter().router
expense_router = expense.ExpenseRouter().router
invoice_router = invoice.InvoiceRouter().router
user_event_router = user_event.UserEventRouter().router
user_router = user.UserRouter().router
reimbursement_router = reimbursement.ReimbursementRouter().router

app.include_router(event_router, prefix="/events", tags=["events"])
app.include_router(expense_router, prefix="/expenses", tags=["expenses"])
app.include_router(invoice_router, prefix="/invoices", tags=["invoices"])
app.include_router(
    reimbursement_router, prefix="/reimbursements", tags=["reimbursements"]
)
app.include_router(user_event_router, prefix="/user-events", tags=["user-events"])
app.include_router(user_router, prefix="/users", tags=["users"])

if __name__ == "__main__":
    config = uvicorn.Config(
        "backend.main:app", port=8080, reload=True, log_config="backend/config.yml"
    )
    server = uvicorn.Server(config)
    server.run()
