from backend.infrastructure.models.role import Role
from backend.infrastructure.repositories.abstract import AbstractRepository


class RoleRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Role)
