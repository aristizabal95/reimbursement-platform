from fastapi import Request, HTTPException
import dto.request as req
import dto.response as resp
from infrastructure import sql
import logging

logger = logging.getLogger(__name__)

async def login(form: req.Login, r: Request) -> resp.Auth:
    try:
        user_info = await sql.user_info(r.app.state.db, **form.model_dump())
    except AssertionError as e:
        raise HTTPException(401)
    return resp.Auth(**user_info, accessToken="super random token")
