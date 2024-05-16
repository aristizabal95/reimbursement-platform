from backend.infrastructure.models.user import User
from backend.infrastructure.repositories.abstract import AbstractRepository


class UserRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(User)

    def get_user_by_username(self, username: str):
        instance = (
            self.session.query(self.model)
            .filter(self.model.username == username)
            .first()
        )
        return instance.to_dict()

    def get_user_by_email(self, email: str):
        instance = (
            self.session.query(self.model).filter(self.model.email == email).first()
        )
        return instance.to_dict()

    def get_all_users_by_role(self, role_id: str):
        instances = (
            self.session.query(self.model).filter(self.model.role_id == role_id).all()
        )
        return [instance.to_dict() for instance in instances]
