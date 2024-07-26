from pydantic import BaseModel


class UserEventIn(BaseModel):
    user_id: int
    event_id: int
    status: int


class UserEventOut(UserEventIn):
    id: int
