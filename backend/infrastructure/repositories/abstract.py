from typing import List

import sqlalchemy.exc

from backend.infrastructure.connection import Connection


class AbstractRepository:
    def __init__(self, model) -> None:
        self.connection = Connection()
        self.session = self.connection.session
        self.model = model

    def get_all(self):
        with self.session as session:
            instances = session.query(self.model).all()
            return [instance.to_dict() for instance in instances]

    def add(self, instance_dict: dict) -> dict:
        with self.session as session:
            try:
                new_instance = self.model(**instance_dict)
                print(new_instance)
                session.add(new_instance)
                session.commit()
            except sqlalchemy.exc.IntegrityError as exc:
                instance_type: str = self.model.__name__
                raise ValueError(f"{instance_type} already exists") from exc
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

    def update(self, id, **fields):
        with self.session as session:
            session.query(self.model).filter(self.model.id == id).update(fields)
        return "OK"

    def get_by(self, **kwargs) -> dict:
        with self.session as session:
            instances = (
                session.query(self.model)
                .filter(
                    *[
                        getattr(self.model, k) == v
                        for k, v in kwargs.items()
                        if v is not None
                    ]
                )
                .all()
            )
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
            session.query(self.model).filter(self.model.id == id).delete()
        return
