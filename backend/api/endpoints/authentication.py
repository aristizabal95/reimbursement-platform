from fastapi import Request, APIRouter
import dto.request as req
import dto.response as resp
from infrastructure import sql
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/login")
async def login(form: req.Login, r: Request) -> resp.Auth:
    user_info = await sql.user_info(r.app.state.db, **form.model_dump())
    return resp.Auth(**user_info, accessToken="super random token")
