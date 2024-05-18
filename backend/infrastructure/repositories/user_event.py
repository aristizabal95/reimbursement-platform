from backend.infrastructure.models.user_event import UserEvent
from backend.infrastructure.repositories.abstract import AbstractRepository


class UserEventRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(UserEvent)

    def get_all_user_events_by_user_id(self, user_id: int):
        instances = (
            self.session.query(self.model).filter(self.model.user_id == user_id).all()
        )
        return [instance.to_dict() for instance in instances]

    def get_all_user_events_by_event_id(self, event_id: int):
        instances = (
            self.session.query(self.model).filter(self.model.event_id == event_id).all()
        )
        return [instance.to_dict() for instance in instances]

    def get_user_events_by_status(self, status: bool):
        instances = (
            self.session.query(self.model).filter(self.model.status == status).all()
        )
        return [instance.to_dict() for instance in instances]
