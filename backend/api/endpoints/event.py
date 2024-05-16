from fastapi import APIRouter, Depends

import backend.api.schema as sch
from backend.domain.services.event import EventService

router = APIRouter()


@router.post("/events")
def create_event(event: dict):
    event_service = EventService()
    new_event_info = event_service.create_event(event)
    return new_event_info


@router.get("/events")
def get_event(filters: sch.Event = Depends()):
    event_service = EventService()
    return event_service.get_event(**filters.model_dump())


@router.put("/events")
def update_event(event_id: int, event: dict):
    event_service = EventService()
    return event_service.update_event(event_id, event)


@router.delete("/events")
def delete_event(event_id: int):
    event_service = EventService()
    return event_service.delete_event(event_id)
