from backend.infrastructure.repositories.expense import ExpenseRepository


class ExpenseService:
    def __init__(self):
        self.expense_repository = ExpenseRepository()

    def create_expense(self, expense):
        return self.expense_repository.add(expense)

    def get_expense(self, **filters):
        return self.expense_repository.get_by(**filters)

    def update_expense(self, expense):
        return self.expense_repository.edit(expense)

    def delete_expense(self, expense_id):
        return self.expense_repository.delete(expense_id)
