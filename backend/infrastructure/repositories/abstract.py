from typing import List

import sqlalchemy.exc

from backend.infrastructure.connection import Connection


class AbstractRepository:
    def __init__(self, model) -> None:
        self.connection = Connection()
        self.session = self.connection.session
        self.model = model

    def get_all(self):
        instances = self.session.query(self.model).all()
        return [instance.to_dict() for instance in instances]

    def add(self, instance_dict: dict) -> dict:
        try:
            new_instance = self.model(**instance_dict)
            print(new_instance)
            self.session.add(new_instance)
            self.session.commit()
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
        self.session.merge(new_instance)
        self.session.commit()
        return new_instance.to_dict()

    def get_by_id(self, id: int) -> dict:
        instance = self.session.query(self.model).get(id)
        if instance is None:
            instance_type: str = self.model.__name__
            raise ValueError(f"{instance_type} not found")
        return instance.to_dict()

    def get_many_by_id(self, ids: List[int]) -> List[dict]:
        instances = self.session.query(self.model).filter(self.model.id.in_(ids)).all()
        return [instance.to_dict() for instance in instances]

    def delete(self, id: int):
        self.session.query(self.model).filter(self.model.id == id).delete()
        self.session.commit()
        return
