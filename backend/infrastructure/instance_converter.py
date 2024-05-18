from backend.infrastructure.models.base import Base


class ORMInstanceConverter:
    def convert_to_dict(self, instance):
        """
        Recursively converts an ORM instance into a dictionary
        """
        return self._single_instance_to_dict(instance)

    def _single_instance_to_dict(self, instance):
        # ORM Objects have relationships with other objects through lists
        if isinstance(instance, (list, tuple)):
            return [
                self._single_instance_to_dict(nested_instance)
                for nested_instance in instance
            ]
        # If instance is not an ORM entity it must be
        # a string, integer or a normal data type
        # hence we do not have to convert it further
        if not isinstance(instance, Base):
            return instance
        dictionary = {
            column: self.convert_to_dict(value)
            for column, value in instance.__dict__.items()
            if not column.startswith("_")  # Filter out internal use attributes
        }
        return dictionary
