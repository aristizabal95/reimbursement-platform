import re
from typing import List

import sqlalchemy.exc

from backend.exceptions import (
    ConflictException,
    InstanceNotFoundException,
    InvalidInputValuesException,
)
from backend.infrastructure.connection import Connection
from backend.infrastructure.models.base_model import BaseModel


class AbstractRepository:
    def __init__(self, model) -> None:
        self.connection = Connection()
        self.session = self.connection.session
        self.model = model

    def get_all(self):
        with self.session as session:
            try:
                instances = session.query(self.model).all()
            except sqlalchemy.exc.DataError as e:
                raise InvalidInputValuesException(e)
            return [instance.to_dict() for instance in instances]

    def add(self, instance_dict: dict) -> dict:
        with self.session as session:
            try:
                new_instance = self.model(**instance_dict)
                session.add(new_instance)
                session.commit()
            except sqlalchemy.exc.IntegrityError as exc:
                instance_type: str = self.model.__name__
                raise InvalidInputValuesException(
                    f"{instance_type} already exists"
                ) from exc
            except sqlalchemy.exc.DataError as e:
                raise InvalidInputValuesException(e)
        return new_instance.to_dict()

    def edit(self, instance_dict: dict) -> dict:
        """
        Edit instance by merging using its id
        :param instance_dict : dict
            Must contain a key called "id" with the primary key value
        """
        new_instance = self.model(**instance_dict)
        with self.session as session:
            session.merge(new_instance)
        return new_instance.to_dict()

    def update(self, id: int, **fields) -> BaseModel:
        """Updates a single entry on the repository

        Args:
            id (int): Id of the instance to be updated

        Raises:
            InstanceNotFoundException: Instance with given id was not found

        Returns:
            BaseModel: Updated Instance
        """
        with self.session as session:
            instance_query = session.query(self.model).filter(self.model.id == id)
            try:
                instance_query.update(fields)
                return instance_query.one()
            except sqlalchemy.exc.NoResultFound:
                raise InstanceNotFoundException()
            except sqlalchemy.exc.IntegrityError as e:
                detail = re.search(r"DETAIL: +(.*?)\n", str(e)).group(1).strip()
                raise InvalidInputValuesException(detail)
            except sqlalchemy.exc.DataError as e:
                raise InvalidInputValuesException(e)

    def get_by(self, **kwargs) -> dict:
        with self.session as session:
            instances_query = session.query(self.model).filter(
                *[
                    getattr(self.model, k) == v
                    for k, v in kwargs.items()
                    if v is not None
                ]
            )
            try:
                instances = instances_query.all()
            except sqlalchemy.exc.DataError as e:
                detail = f"{e.orig.diag.message_primary}"
                raise InvalidInputValuesException(detail)
            if instances is None:
                instance_type: str = self.model.__name__
                raise ValueError(f"{instance_type} not found")
            return [instance.to_dict() for instance in instances]

    def get_many_by_id(self, ids: List[int]) -> List[dict]:
        with self.session as session:
            instances = session.query(self.model).filter(self.model.id.in_(ids)).all()
            return [instance.to_dict() for instance in instances]

    def delete(self, id: int):
        with self.session as session:
            instance_query = session.query(self.model).filter(self.model.id == id)
            try:
                instance_query.one()  # Check if the instance in question exists
            except sqlalchemy.exc.NoResultFound:
                raise InstanceNotFoundException()
            try:
                instance_query.delete()
            except sqlalchemy.exc.IntegrityError as e:
                detail = f"{self.model.__name__} still referenced by {e.orig.diag.table_name}"
                raise ConflictException(detail)
        return
