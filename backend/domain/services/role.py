from backend.infrastructure.repositories.role import RoleRepository


class RoleService:
    def __init__(self):
        self.role_repository = RoleRepository()

    def create_role(self, role):
        return self.role_repository.add(role)

    def get_role(self, **filters):
        return self.role_repository.get_by(**filters)

    def get_all_roles(self):
        return self.role_repository.get_all()

    def update_role(self, role):
        return self.role_repository.edit(role)

    def delete_role(self, role_id):
        return self.role_repository.delete(role_id)
