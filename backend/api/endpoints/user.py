from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.partial import Partial
from backend.api.schemas.user import UserIn, UserOut
from backend.domain.services.user import UserService


class UserRouter(AbstractRouter):
    def __init__(self):
        super().__init__(UserService(), UserIn, Partial[UserIn], UserOut)
