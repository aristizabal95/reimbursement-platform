from backend.infrastructure.repositories.user_event import UserEventRepository


class UserEventService:
    def __init__(self):
        super().__init__(UserEventRepository())
