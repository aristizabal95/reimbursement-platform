from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.event import EventRepository


class EventService(AbstractService):
    def __init__(self):
        super().__init__(EventRepository())
