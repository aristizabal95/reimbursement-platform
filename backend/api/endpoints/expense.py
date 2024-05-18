from fastapi import APIRouter, Depends

import backend.api.schema as sch
from backend.domain.services.expense import ExpenseService

router = APIRouter()


@router.post("/expenses")
def create_expense(expense: dict):
    expense_service = ExpenseService()
    return expense_service.create_expense(expense)


@router.get("/expenses")
def get_expense(filters: sch.Expense = Depends()):
    expense_service = ExpenseService()
    return expense_service.get_expense(**filters.model_dump())


@router.put("/expenses")
def update_expense(expense: dict):
    expense_service = ExpenseService()
    return expense_service.update_expense(expense)


@router.delete("/expenses")
def delete_expense(expense_id: int):
    expense_service = ExpenseService()
    return expense_service.delete_expense(expense_id)
