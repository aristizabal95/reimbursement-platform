from pydantic import BaseModel


class UserIn(BaseModel):
    email: str
    username: str
    role_id: int


class UserOut(UserIn):
    id: int
