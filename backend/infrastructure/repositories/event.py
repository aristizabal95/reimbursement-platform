from backend.infrastructure.models.event import Event
from backend.infrastructure.repositories.abstract import AbstractRepository


class EventRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Event)

    def get_all_events_by_center_of_costs(self, center_of_costs: str):
        instances = (
            self.session.query(self.model)
            .filter(self.model.center_of_costs == center_of_costs)
            .all()
        )
        return [instance.to_dict() for instance in instances]

    def get_all_events_by_status(self, status: str):
        instances = (
            self.session.query(self.model).filter(self.model.status == status).all()
        )
        return [instance.to_dict() for instance in instances]
