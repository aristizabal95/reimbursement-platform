from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.domain.services.role import RoleService

router = APIRouter()


@router.post("/role")
def create_role(role: dict):
    role_service = RoleService()
    role_service.create_role(role)
    return JSONResponse(content={"message": "Role created successfully"})


@router.get("/role")
def get_role(role_id: int):
    role_service = RoleService()
    return role_service.get_role(role_id)


@router.get("/roles")
def get_all_roles():
    role_service = RoleService()
    return role_service.get_all_roles()


@router.put("/role")
def update_role(role: dict):
    role_service = RoleService()
    return role_service.update_role(role)


@router.delete("/role")
def delete_role(role_id: int):
    role_service = RoleService()
    return role_service.delete_role(role_id)
