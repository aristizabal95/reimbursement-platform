from fastapi import FastAPI
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


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

