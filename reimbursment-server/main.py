from fastapi import FastAPI, Request
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import DTO.response as resp
import DTO.request as req
from datetime import datetime, UTC
from uuid import uuid1


FORMAT_DATES = "%b, %d %H:%M"

info = [
        {"id": "ff20-32-344-201", "name": "Andres F Gonzalez", "date": "2024-01-18", "concept": "Mental Health", "amount": 180000, "currency": "COP"},
        {"id": "ff20-32-344-202", "name": "Alejandro Aristizabal", "date": "2024-01-13", "concept": "Nerdapalooza", "amount": 320000, "currency": "COP"},
        {"id": "ff20-32-344-203", "name": "Daniel Velázquez ", "date": "2024-01-28", "concept": "Nerdapalooza", "amount": 732000, "currency": "COP"}
    ]    

detail = {
    "ff20-32-344-201": [
        {"id": 1, "txnDate": "2024-01-14", "type": "MEALS INTERNAL", "detail": "Breakfast", "vendor": "Tofu Palace", "amnt": 8300, "currency": "COP", "invoice": "/path??"},
        {"id": 2, "txnDate": "2024-01-12", "type": "MEALS INTERNAL", "detail": "Lunch", "vendor": "Brocoli", "amnt": 38300, "currency": "COP", "invoice": "/path??"},
        {"id": 3, "txnDate": "2024-01-10", "type": "MEALS INTERNAL", "detail": "Dinner", "vendor": "Veggy Love", "amnt": 33000, "currency": "COP", "invoice": "/path??"}
    ],
    "ff20-32-344-202":
    [
        {"id": 1, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Breakfast", "vendor": "Happy Cow", "amnt": 5000, "currency": "COP", "invoice": "/path??"},
        {"id": 2, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Lunch", "vendor": "Vegan For the Animals", "amnt": 10000, "currency": "COP", "invoice": "/path??"},
        {"id": 3, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Dinner", "vendor": "La cocinita verde", "amnt": 75000, "currency": "COP", "invoice": "/path??"}
    ],
    "ff20-32-344-203":
    [
        {"id": 1, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Breakfast", "vendor": "De Raiz", "amnt": 8300, "currency": "COP", "invoice": "/path??"},
        {"id": 2, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Lunch", "vendor": "Impossible Burger", "amnt": 2800, "currency": "COP", "invoice": "/path??"},
        {"id": 3, "txnDate": "2024-03-01", "type": "MEALS INTERNAL", "detail": "Dinner", "vendor": "Cardamomo", "amnt": 33000, "currency": "COP", "invoice": "/path??"}
    ]
}

available_event_list = [
    {'event_id': 'nerd-24', 'event_name': 'Nerdapalooza', 'create_date': '2024-01-01'},
    {'event_id': 'men-hel', 'event_name': 'Mental Health','create_date': '2024-01-01'},
    {'event_id': 'educ-may', 'event_name': 'Education','create_date': '2024-01-01'},
    ]

reimbursment_db = {}

    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/task-list")
async def task_list():
    return JSONResponse(info)


@app.get("/task-detail/{id}")
async def task_detail(id: str):
    return JSONResponse(detail.get(id, []))


myEvents = {'ago1':[]}

#TODO: This function should depend on the userId.
@app.get("/available-events")
async def available_events():
    return JSONResponse(available_event_list)

@app.get("/my-event-list/{userId}")
async def my_event_list(userId: str):
    #TODO: Call the database to get all events in status draft or waiting for this user.
    if userId in myEvents:
        return myEvents[userId]
    return JSONResponse([])

@app.post('/add-event')
async def add_event_list(form: req.AddEvent):
    #Check if there is an event with that id, if not proceed!
    print(form)
    AVAILABLE_USERS = {'ago1'}
    if form.user_id not in AVAILABLE_USERS:
        return "Get the fuck out of here"
    user_events = set([el.event_id for el in myEvents[form.user_id]])
    if form.event_id in user_events:
        return "You already have this event! Fool me once.."
    #TODO: This should be a call to the database.
    event_details = [el for el in available_event_list if el['event_id'] == form.event_id][0]
    newUserEvent = {
        'id': uuid1().__str__(),
        'event_id': form.event_id,
        'event_name': event_details['event_name'], 
        'create_date': datetime.now(UTC).strftime(FORMAT_DATES),
        'status': 'draft',
        'total_amount': 0,
        'currency': 'USD' ## This should in the db or in the event..
        }
    myEvents[form.user_id].append(resp.UserEvent(**newUserEvent))
    return "OK"

@app.get('/invoice-list/{userId}')
async def invoice_list(userId: str):
    #TODO: Check if user is allow to create/view this reimbursment list!!
    print(userId)
    return reimbursment_db.get(userId, [])


@app.post('/new-invoice')
async def new_invoice(form: req.InvoiceDetail):
    form.invoice_id = uuid1().__str__()
    # TODO: Fix this is horrible!!
    if 'ago1' in reimbursment_db:
        reimbursment_db['ago1'].append(form)
    else:
        reimbursment_db['ago1'] = [form]
    return JSONResponse("OK")

