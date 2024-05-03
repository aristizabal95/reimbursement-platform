from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.domain.services.user import UserService

router = APIRouter()


@router.post("/user")
def create_user(user: dict):
    user_service = UserService()
    user_service.create_user(user)
    return JSONResponse(content={"message": "User created successfully"})


@router.get("/user")
def get_user(user_id: int):
    user_service = UserService()
    return user_service.get_user(user_id)


@router.get("/user-by-email")
def get_user_by_email(email: str):
    user_service = UserService()
    return user_service.get_user_by_email(email)


@router.get("/user-by-username")
def get_user_by_username(username: str):
    user_service = UserService()
    return user_service.get_user_by_username(username)


@router.get("/users")
def get_all_users():
    user_service = UserService()
    return user_service.get_all_users()


@router.get("/users-by-role")
def get_all_users_by_role(role_id: int):
    user_service = UserService()
    return user_service.get_all_users_by_role(role_id)


@router.put("/user")
def update_user(user_id: int, user: dict):
    user_service = UserService()
    return user_service.update_user(user_id, user)


@router.delete("/user")
def delete_user(user_id: int):
    user_service = UserService()
    return user_service.delete_user(user_id)
