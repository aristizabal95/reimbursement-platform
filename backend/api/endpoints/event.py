from fastapi import APIRouter
from fastapi.responses import JSONResponse

from backend.domain.services.event import EventService

router = APIRouter()


@router.post("/event")
def create_event(event: dict):
    event_service = EventService()
    event_service.create_event(event)
    return JSONResponse(content={"message": "Event created successfully"})


@router.get("/event")
def get_event(event_id: int):
    event_service = EventService()
    return event_service.get_event(event_id)


@router.get("/events")
def get_all_events():
    event_service = EventService()
    return event_service.get_all_events()


@router.get("/events-by-center-of-costs")
def get_all_events_by_center_of_costs(center_of_costs: str):
    event_service = EventService()
    return event_service.get_all_events_by_center_of_costs(center_of_costs)


@router.get("/events-by-status")
def get_all_events_by_status(status: str):
    event_service = EventService()
    return event_service.get_all_events_by_status(status)


@router.put("/event")
def update_event(event_id: int, event: dict):
    event_service = EventService()
    return event_service.update_event(event_id, event)


@router.delete("/event")
def delete_event(event_id: int):
    event_service = EventService()
    return event_service.delete_event(event_id)
