from typing import Annotated, List, Type, TypeVar

from fastapi import APIRouter, Depends, HTTPException, Path
from pydantic import BaseModel

from backend.domain.services.abstract import AbstractService
from backend.exceptions import (
    ConflictException,
    InstanceNotFoundException,
    InvalidInputValuesException,
)

SchemaType = TypeVar("SchemaType", bound=BaseModel)


class AbstractRouter:
    def __init__(
        self,
        service: AbstractService,
        schema_in: Type[SchemaType],
        schema_opt: Type[SchemaType],
        schema_out: Type[SchemaType],
    ):
        self._service = service
        self._schema_in = schema_in
        self._schema_opt = schema_opt
        self._schema_out = schema_out
        self._router = APIRouter()
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post("", responses={400: {}})
        def create(resource: self._schema_in) -> self._schema_out:
            return self.create(resource.model_dump())

        @self.router.get("", responses={400: {}})
        def get(filters: self._schema_opt = Depends()) -> List[self._schema_out]:
            return self.get(filters)

        @self.router.get("/{resource_id}", responses={404: {}})
        def get_by_id(
            resource_id: Annotated[
                int, Path(title="The ID of the item to get", ge=1, lt=2**31)
            ],
        ) -> self._schema_out:
            return self.get_by_id(resource_id)

        @self.router.put("/{resource_id}", responses={404: {}, 400: {}})
        def update(
            resource_id: Annotated[
                int, Path(title="The ID of the item to get", ge=1, lt=2**31)
            ],
            resource: self._schema_in,
        ) -> self._schema_out:
            return self.update(resource_id, resource)

        @self.router.delete(
            "/{resource_id}", status_code=204, responses={404: {}, 409: {}}
        )
        def delete(
            resource_id: Annotated[
                int, Path(title="The ID of the item to get", ge=1, lt=2**31)
            ],
        ) -> None:
            self.delete(resource_id)

    @property
    def router(self):
        return self._router

    def create(self, resource: dict):
        try:
            new_resource_info = self._service.create(resource)
        except InvalidInputValuesException as e:
            raise HTTPException(400, detail=str(e))
        return new_resource_info

    def get(self, filters):
        try:
            return self._service.get(**filters.model_dump())
        except InvalidInputValuesException as e:
            raise HTTPException(400, detail=str(e))

    def get_by_id(self, resource_id: int):
        try:
            return self._service.get_by_id(resource_id)
        except InstanceNotFoundException:
            raise HTTPException(404)
        except InvalidInputValuesException as e:
            raise HTTPException(400, detial=str(e))

    def update(self, resource_id: int, resource: SchemaType = Depends()):
        try:
            return self._service.update(resource_id, resource.model_dump())
        except InstanceNotFoundException:
            raise HTTPException(404)
        except InvalidInputValuesException as e:
            raise HTTPException(400, detail=str(e))

    def delete(self, resource_id: int):
        try:
            return self._service.delete(resource_id)
        except InstanceNotFoundException:
            raise HTTPException(404)
        except ConflictException as e:
            raise HTTPException(409, detail=str(e))
