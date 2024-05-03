from backend.infrastructure.repositories.user import UserRepository


class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user):
        return self.user_repository.add(user)

    def get_user(self, user_id):
        return self.user_repository.get_by_id(user_id)

    def get_user_by_username(self, username):
        return self.user_repository.get_user_by_username(username)

    def get_user_by_email(self, email):
        return self.user_repository.get_user_by_email(email)

    def get_all_users(self):
        return self.user_repository.get_all()

    def get_all_users_by_role(self, role_id):
        return self.user_repository.get_all_users_by_role(role_id)

    def update_user(self, user_id, user):
        return self.user_repository.edit(user_id, user)

    def delete_user(self, user_id):
        return self.user_repository.delete(user_id)
