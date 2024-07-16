from backend.infrastructure.repositories.role import RoleRepository


class RoleService:
    def __init__(self):
        super().__init__(RoleRepository())
