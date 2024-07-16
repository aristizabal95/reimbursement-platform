from backend.infrastructure.models.user_event import UserEvent
from backend.infrastructure.repositories.abstract import AbstractRepository


class UserEventRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(UserEvent)
