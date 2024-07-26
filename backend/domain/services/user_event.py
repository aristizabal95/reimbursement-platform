from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.user_event import UserEventRepository


class UserEventService(AbstractService):
    def __init__(self):
        super().__init__(UserEventRepository())
