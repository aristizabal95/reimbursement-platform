from backend.infrastructure.repositories.event import EventRepository


class EventService:
    def __init__(self):
        self.event_repository = EventRepository()

    def create_event(self, event):
        return self.event_repository.add(event)

    def get_event(self, event_id):
        return self.event_repository.get_by_id(event_id)

    def get_all_events(self):
        return self.event_repository.get_all()

    def get_all_events_by_center_of_costs(self, center_of_costs):
        return self.event_repository.get_all_events_by_center_of_costs(center_of_costs)

    def get_all_events_by_status(self, status):
        return self.event_repository.get_all_events_by_status(status)

    def update_event(self, event):
        return self.event_repository.edit(event)

    def delete_event(self, event_id):
        return self.event_repository.delete(event_id)
