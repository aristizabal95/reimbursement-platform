from abc import ABC, abstractmethod

from backend.infrastructure.repositories.abstract import AbstractRepository


class AbstractService(ABC):
    def __init__(self, repository: AbstractRepository) -> None:
        self.__repository = repository

    @property
    @abstractmethod
    def repository(self) -> AbstractRepository:
        return self.__repository

    def create(self, resource):
        return self.repository.add(resource)

    def get(self, **filters):
        return self.repository.get_by(**filters)

    def update(self, resource):
        return self.repository.edit(resource)

    def delete(self, resource_id):
        return self.repository.delete(resource_id)
