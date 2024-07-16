from backend.infrastructure.repositories.user import UserRepository


class UserService:
    def __init__(self):
        super().__init__(UserRepository())
