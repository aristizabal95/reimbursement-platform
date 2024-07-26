from abc import ABC

from backend.exceptions import InstanceNotFoundException
from backend.infrastructure.repositories.abstract import AbstractRepository


class AbstractService(ABC):
    def __init__(self, repository: AbstractRepository) -> None:
        self.__repository = repository

    @property
    def repository(self) -> AbstractRepository:
        return self.__repository

    def create(self, resource):
        return self.repository.add(resource)

    def get(self, **filters):
        return self.repository.get_by(**filters)

    def get_by_id(self, id: int):
        results = self.repository.get_by(id=id)
        try:
            return results[0]
        except IndexError:
            raise InstanceNotFoundException()

    def update(self, id: int, resource):
        # resource["id"] = id
        # return self.repository.edit(resource)
        return self.repository.update(id, **resource)

    def delete(self, resource_id):
        return self.repository.delete(resource_id)
