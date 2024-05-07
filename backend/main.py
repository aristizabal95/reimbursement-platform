from fastapi import FastAPI
from api.endpoints import event, reimbursement, authentication
import settings as sett
import uvicorn
import logging
from starlette.routing import Route

logger = logging.getLogger(__name__)

routes = [
    Route("/event", endpoint=event.available_events, methods=["GET"]),
    Route("/event", endpoint=event.add_event, methods=["POST"]),
    Route("/expenses", endpoint=event.add_expenses, methods=["POST"]),
    Route("/reimbursement/{user_id}", endpoint=reimbursement.reimbursement, methods=["GET"]),
    Route("/reimbursement", endpoint=reimbursement.add_reimbursement, methods=["POST"]),
    Route("/invoice", endpoint=reimbursement.invoice, methods=["GET"]),
    Route("/invoice", endpoint=reimbursement.new_invoice, methods=["POST"]),
    Route("/login", endpoint=authentication.login, methods=["POST"])
]

app = FastAPI(lifespan=sett.lifespan, middleware=sett.middleware, 
              exception_handlers={Exception: sett.unicorn_exception_handler})

app.include_router(authentication.router, tags=["Authentication"])
app.include_router(event.router, tags=["Events"])
app.include_router(reimbursement.router, tags=["Reimbursement"])



if __name__ == '__main__':
    config = uvicorn.Config(app, port=8080, reload=True, log_level="info")
    server = uvicorn.Server(config)
    server.run()