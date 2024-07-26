from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.event import EventIn, EventOut
from backend.api.schemas.partial import Partial
from backend.domain.services.event import EventService


class EventRouter(AbstractRouter):
    def __init__(self):
        super().__init__(EventService(), EventIn, Partial[EventIn], EventOut)
