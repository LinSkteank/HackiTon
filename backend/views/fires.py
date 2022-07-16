from fastapi import APIRouter
from starlette.responses import JSONResponse

from data.db import get_cached_points


fires_route = APIRouter()


@fires_route.get("/fires")
async def bancho_connect():
    return JSONResponse(get_cached_points())
