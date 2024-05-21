from backend.infrastructure.models.event import Event
from backend.infrastructure.models.reimbursement import Reimbursement
from backend.infrastructure.models.reimbursement_status import ReimbursementStatus
from backend.infrastructure.models.user import User
from backend.infrastructure.repositories.abstract import AbstractRepository


class ReimbursementRepository(AbstractRepository):
    def __init__(self) -> None:
        super().__init__(Reimbursement)

    def get_reimbursements_info(self, **filters):
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
                    "reimbursement_id": reimbursement.id,
                    "username": user.username,
                    "event": event.title,
                    "currency": event.currency,
                    "status": reimbursement_status.description,
                    "create_date": reimbursement.create_date,
                }
            )
        return result
