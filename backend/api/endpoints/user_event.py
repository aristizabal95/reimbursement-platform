from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

import backend.api.schema as sch
from backend.domain.services.user_event import UserEventService

router = APIRouter()


@router.post("/user-events")
def create_user_event(user: dict):
    user_event = UserEventService()
    return user_event.create_user_event(user)


@router.get("/user-events")
def get_user_event(filters: sch.UserEvent = Depends()):
    user_event = UserEventService()
    return user_event.get_user_event(**filters.model_dump())


@router.put("/user-events")
def update_user_event(user: dict):
    user_event = UserEventService()
    user_event.update_user_event(user)
    return JSONResponse(content={"message": "User_event updated successfully"})


@router.delete("/user-events")
def delete_user_event(user_event_id: int):
    user_event = UserEventService()
    user_event.delete_user_event(user_event_id)
    return JSONResponse(content={"message": "User_event deleted successfully"})
