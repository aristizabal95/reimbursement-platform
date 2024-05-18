from fastapi import APIRouter, Depends

import backend.api.schema as sch
from backend.domain.services.user import UserService

router = APIRouter()


@router.post("/users")
def create_user(user: dict):
    user_service = UserService()
    return user_service.create_user(user)


@router.get("/users")
def get_user(filters: sch.User = Depends()):
    user_service = UserService()
    return user_service.get_user(**filters.model_dump())


@router.put("/users")
def update_user(user_id: int, user: dict):
    user_service = UserService()
    return user_service.update_user(user_id, user)


@router.delete("/users")
def delete_user(user_id: int):
    user_service = UserService()
    return user_service.delete_user(user_id)
