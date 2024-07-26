from backend.domain.services.abstract import AbstractService
from backend.infrastructure.repositories.user import UserRepository


class UserService(AbstractService):
    def __init__(self):
        super().__init__(UserRepository())
