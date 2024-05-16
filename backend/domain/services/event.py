from backend.infrastructure.repositories.event import EventRepository


class EventService:
    def __init__(self):
        self.event_repository = EventRepository()

    def create_event(self, event):
        return self.event_repository.add(event)

    def get_event(self, **filters):
        return self.event_repository.get_by(**filters)

    def update_event(self, event):
        return self.event_repository.edit(event)

    def delete_event(self, event_id):
        return self.event_repository.delete(event_id)
