import logging

import dto.request as req
import dto.response as resp
from fastapi import HTTPException, Request
from infrastructure import sql

logger = logging.getLogger(__name__)


async def login(form: req.Login, r: Request) -> resp.Auth:
    try:
        user_info = await sql.user_info(r.app.state.db, **form.model_dump())
    except AssertionError:
        raise HTTPException(401)
    return resp.Auth(**user_info, accessToken="super random token")
