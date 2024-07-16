from backend.infrastructure.models.event import Event
from backend.infrastructure.repositories.abstract import AbstractRepository


class EventRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Event)
