from backend.infrastructure.models.user import User
from backend.infrastructure.repositories.abstract import AbstractRepository


class UserRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(User)
