from pydantic import BaseModel

class UserEvent(BaseModel):
    id:str
    event_name: str
    create_date: str
    status: str
    total_amount: float
    currency: str

