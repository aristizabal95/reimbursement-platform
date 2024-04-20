from pydantic import BaseModel

class AddEvent(BaseModel):
    event_id: str
    user_id: str
    create_date: int #UTC timestamp!
    default_currency: str

