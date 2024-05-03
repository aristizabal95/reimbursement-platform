from fastapi import APIRouter

from backend.domain.services.expense import ExpenseService

router = APIRouter()


@router.post("/expense")
def create_expense(expense: dict):
    expense_service = ExpenseService()
    return expense_service.create_expense(expense)


@router.get("/expense")
def get_expense(expense_id: int):
    expense_service = ExpenseService()
    return expense_service.get_expense(expense_id)


@router.get("/expenses")
def get_all_expenses():
    expense_service = ExpenseService()
    return expense_service.get_all_expenses()


@router.get("/expenses-by-event")
def get_all_expenses_by_event(event_id: int):
    expense_service = ExpenseService()
    return expense_service.get_all_expenses_by_event_id(event_id)


@router.put("/expense")
def update_expense(expense: dict):
    expense_service = ExpenseService()
    return expense_service.update_expense(expense)


@router.delete("/expense")
def delete_expense(expense_id: int):
    expense_service = ExpenseService()
    return expense_service.delete_expense(expense_id)
