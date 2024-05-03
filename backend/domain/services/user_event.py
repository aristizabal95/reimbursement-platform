from backend.infrastructure.repositories.user_event import UserEventRepository


class UserEventService:
    def __init__(self):
        self.user_event_repository = UserEventRepository()

    def create_user_event(self, user_event):
        return self.user_event_repository.add(user_event)

    def get_user_event(self, user_event_id):
        return self.user_event_repository.get_by_id(user_event_id)

    def get_all_user_events(self):
        return self.user_event_repository.get_all()

    def get_all_user_events_by_user_id(self, user_id):
        return self.user_event_repository.get_all_user_events_by_user_id(user_id)

    def get_all_user_events_by_event_id(self, event_id):
        return self.user_event_repository.get_all_user_events_by_event_id(event_id)

    def get_all_user_events_by_status(self, status):
        return self.user_event_repository.get_user_events_by_status(status)

    def update_user_event(self, user_event):
        return self.user_event_repository.edit(user_event)

    def delete_user_event(self, user_event_id):
        return self.user_event_repository.delete(user_event_id)
