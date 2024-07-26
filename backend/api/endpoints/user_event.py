from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.partial import Partial
from backend.api.schemas.user_event import UserEventIn, UserEventOut
from backend.domain.services.user_event import UserEventService


class UserEventRouter(AbstractRouter):
    def __init__(self):
        super().__init__(
            UserEventService(), UserEventIn, Partial[UserEventIn], UserEventOut
        )
