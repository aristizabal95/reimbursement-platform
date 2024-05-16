from backend.infrastructure.repositories.user import UserRepository


class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user):
        return self.user_repository.add(user)

    def get_user(self, **filters):
        return self.user_repository.get_by(**filters)

    def update_user(self, user_id, user):
        return self.user_repository.edit(user_id, user)

    def delete_user(self, user_id):
        return self.user_repository.delete(user_id)
