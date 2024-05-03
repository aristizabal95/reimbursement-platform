from backend.infrastructure.repositories.expense import ExpenseRepository


class ExpenseService:
    def __init__(self):
        self.expense_repository = ExpenseRepository()

    def create_expense(self, expense):
        return self.expense_repository.add(expense)

    def get_expense(self, expense_id):
        return self.expense_repository.get_by_id(expense_id)

    def get_all_expenses(self):
        return self.expense_repository.get_all()

    def get_all_expenses_by_event_id(self, event_id):
        return self.expense_repository.get_all_expenses_by_event_id(event_id)

    def update_expense(self, expense):
        return self.expense_repository.edit(expense)

    def delete_expense(self, expense_id):
        return self.expense_repository.delete(expense_id)
