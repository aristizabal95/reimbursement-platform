from abc import ABC, abstractmethod

from backend.infrastructure.repositories.abstract import AbstractRepository


class AbstractService(ABC):
    def __init__(self, repository: AbstractRepository) -> None:
        self.__repository = repository

    @property
    @abstractmethod
    def repository(self) -> AbstractRepository:
        return self.__repository

    def create(self, entity):
        return self.repository.add(entity)

    def get(self, **filters):
        return self.repository.get_by(**filters)

    def update(self, entity):
        return self.repository.edit(entity)

    def delete(self, entity_id):
        return self.repository.delete(entity_id)
