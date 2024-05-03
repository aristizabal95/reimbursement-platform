from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.domain.services.user_event import UserEventService

router = APIRouter()


@router.post("/user-event")
def create_user_event(user: dict):
    user_event = UserEventService()
    user_event.create_user_event(user)
    return JSONResponse(content={"message": "User created successfully"})


@router.get("/user-event")
def get_user_event(user_id: int):
    user_event = UserEventService()
    return user_event.get_user_event(user_id)


@router.get("/user-events")
def get_all_user_events():
    user_event = UserEventService()
    return user_event.get_all_user_events()


@router.get("/user-events-by-user")
def get_all_user_events_by_user_id(user_id: int):
    user_event = UserEventService()
    return user_event.get_all_user_events_by_user_id(user_id)


@router.get("/user-events-by-event")
def get_all_user_events_by_event_id(event_id: int):
    user_event = UserEventService()
    return user_event.get_all_user_events_by_event_id(event_id)


@router.get("/user-events-by-status")
def get_all_user_events_by_status(status: bool):
    user_event = UserEventService()
    return user_event.get_all_user_events_by_status(status)


@router.put("/user-event")
def update_user_event(user: dict):
    user_event = UserEventService()
    user_event.update_user_event(user)
    return JSONResponse(content={"message": "User_event updated successfully"})


@router.delete("/user-event")
def delete_user_event(user_event_id: int):
    user_event = UserEventService()
    user_event.delete_user_event(user_event_id)
    return JSONResponse(content={"message": "User_event deleted successfully"})
