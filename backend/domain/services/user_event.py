from backend.infrastructure.repositories.user_event import UserEventRepository


class UserEventService:
    def __init__(self):
        self.user_event_repository = UserEventRepository()

    def create_user_event(self, user_event):
        return self.user_event_repository.add(user_event)

    def get_user_event(self, **filters):
        return self.user_event_repository.get_by(**filters)

    def update_user_event(self, user_event):
        return self.user_event_repository.edit(user_event)

    def delete_user_event(self, user_event_id):
        return self.user_event_repository.delete(user_event_id)
