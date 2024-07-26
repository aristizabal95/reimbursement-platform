from backend.infrastructure.models.event import Event
from backend.infrastructure.models.reimbursement import Reimbursement
from backend.infrastructure.models.reimbursement_status import ReimbursementStatus
from backend.infrastructure.models.user import User
from backend.infrastructure.repositories.abstract import AbstractRepository


class ReimbursementRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Reimbursement)

    def get_by(self, **filters):
        instances = (
            self.session.query(self.model, Event, User, ReimbursementStatus)
            .join(Event)
            .join(User)
            .join(ReimbursementStatus)
            .where(
                *[
                    getattr(self.model, name) == value
                    for name, value in filters.items()
                    if value is not None
                ]
            )
            .all()
        )
        result = []
        for reimbursement, event, user, reimbursement_status in instances:
            # TODO: Calculate the total of the reimbursement, converting the amount to the event currency.
            result.append(
                {
                    "id": reimbursement.id,
                    "user_id": reimbursement.user_id,
                    "event_id": reimbursement.event_id,
                    "status_id": reimbursement.status_id,
                    "description": reimbursement.description,
                    "username": user.username,
                    "currency": event.currency,
                    "event": event.title,
                    "status": reimbursement_status.description,
                    "created_at": reimbursement.created_at,
                }
            )
        return result
