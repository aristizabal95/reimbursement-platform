import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.endpoints import (
    event,
    expense,
    invoice,
    reimbursement,
    user,
    user_event,
)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(event.router, prefix="/events", tags=["events"])
app.include_router(expense.router, prefix="/expenses", tags=["expenses"])
app.include_router(invoice.router, prefix="/invoices", tags=["invoices"])
app.include_router(
    reimbursement.router, prefix="/reimbursements", tags=["reimbursements"]
)
app.include_router(user_event.router, prefix="/user-events", tags=["user-events"])
app.include_router(user.router, prefix="/users", tags=["users"])

if __name__ == "__main__":
    config = uvicorn.Config(app, port=8080)
    server = uvicorn.Server(config)
    server.run()
