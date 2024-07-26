from fastapi import HTTPException

from backend.api.endpoints.abstract import AbstractRouter
from backend.api.schemas.expense import ExpenseBatchIn, ExpenseIn, ExpenseOut
from backend.api.schemas.partial import Partial
from backend.domain.services.expense import ExpenseService
from backend.exceptions import InvalidInputValuesException


class ExpenseRouter(AbstractRouter):
    def __init__(self):
        super().__init__(ExpenseService(), ExpenseIn, Partial[ExpenseIn], ExpenseOut)

    def create_batch(self, resources: ExpenseBatchIn):
        try:
            resources_info = [
                self._service.create(resource.model_dump())
                for resource in resources.expenses
            ]
        except InvalidInputValuesException as e:
            raise HTTPException(422, detail=str(e))
        return resources_info

    def _setup_routes(self):
        super()._setup_routes()

        @self.router.post("/batch", responses={422: {}})
        def create_batch(resources: ExpenseBatchIn):
            return self.create_batch(resources)
