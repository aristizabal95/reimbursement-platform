from fastapi import Request, APIRouter
import dto.request as req
import dto.response as resp
from infrastructure import sql

router = APIRouter()

@router.post("login")
async def login(form: req.Login, r: Request) -> resp.Auth:
    user_info = sql.user_info(r.state.db, **form.model_dump())
    return resp.Auth(**user_info, accessToken="super random token")
