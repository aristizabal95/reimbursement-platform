# coding: utf-8
from sqlalchemy import Column, Integer

from backend.infrastructure.instance_converter import ORMInstanceConverter


class BaseModel:
    """The BaseModel class from which futures classes will be derived"""

    id = Column(Integer, primary_key=True)

    def to_dict(self) -> dict:
        """
        Converts an ORM instance into a dictionary.
        """
        return ORMInstanceConverter().convert_to_dict(self)
