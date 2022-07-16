import asyncio
import math

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apes.apes import nasa_api
from models.fire import FirePoint
from views.fires import fires_route
from data.db import get_fire_points, add_fire_point, clear_fire_points, set_cached_points

app = FastAPI()

app.include_router(fires_route)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    asyncio.get_event_loop().create_task(get_nasa_data_and_sleep())


async def get_nasa_data_and_sleep() -> None:
    while True:
        await load_nasa_data()
        await asyncio.sleep(30 * 60)


async def load_nasa_data() -> None:
    fires = await nasa_api()
    clear_fire_points()

    for fire in fires:
        skip = False

        for point in get_fire_points():
            lat_delta = fire.latitude - point.latitude
            lng_delta = fire.longitude - point.longitude

            if math.sqrt(lng_delta ** 2 + lat_delta ** 2) < 5:
                point.frp = (point.frp * point.count + fire.frp) / (point.count + 1)
                point.count += 1
                skip = True
                break

        if not skip:
            point = FirePoint(**fire.__dict__, count=1)

            add_fire_point(point)

    set_cached_points(list(map((lambda p: p.__dict__), get_fire_points())))
