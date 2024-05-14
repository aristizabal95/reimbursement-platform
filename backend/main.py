from fastapi import FastAPI
import domain.services.authentication as auth
import domain.services.event as event
import domain.services.reimbursement as reimb
import settings as sett
import uvicorn
import logging

logger = logging.getLogger(__name__)

app = FastAPI(lifespan=sett.lifespan, middleware=sett.middleware, exception_handlers={Exception: sett.unicorn_exception_handler})

app.add_api_route("/login", auth.login, methods=["POST"], tags=["Login"])
app.add_api_route("/events/{user_id}", event.available_events, methods=["GET"], tags=["Events"], description="Get all events that are available for a given user.")
app.add_api_route("/events", event.add_events, methods=["POST"], tags=["Events"], description="Add a new event in the events tables.")
app.add_api_route("/expenses", event.add_expenses, methods=["POST"], tags=["Expenses"])
app.add_api_route("/expenses/{reimb_id}", event.get_expenses, methods=["GET"], tags=["Expenses"], description="Get all available expenses associated with a reimbursement_id")
app.add_api_route("/reimbursements/{user_id}", reimb.user_reimbursements, methods=["GET"], tags=["Reimbursements"], description="Get all reimbursements details for a given user.")
app.add_api_route("/reimbursements", reimb.add_reimbursements, methods=["POST"], tags=["Reimbursements"], description="Add a reimbursement")

if __name__ == '__main__':
    config = uvicorn.Config(app, port=8080, reload=True)
    server = uvicorn.Server(config)
    server.run()