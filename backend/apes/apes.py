import os
from typing import List

import aiohttp
from datetime import datetime, timedelta
from dotenv import load_dotenv

from models.fire import Fire


load_dotenv()
NASA_KEY = os.getenv("NASA_KEY")

nasa_url = "https://firms.modaps.eosdis.nasa.gov/api/area/csv/" + NASA_KEY
nasa_url += "/VIIRS_NOAA20_NRT/world/1/" + str((datetime.now() - timedelta(days=1)).date())


async def nasa_api() -> List[Fire]:
    header = {"Content-Type": "text/plain"}

    async with aiohttp.ClientSession(headers=header) as session:
        async with session.get(nasa_url) as resp:
            fires = []

            data = await resp.text()
            fire_lines = data.split("\n")

            for fire_line in fire_lines[1:]:
                fire_data = fire_line.split(",")
                fire = Fire(
                    latitude=float(fire_data[0]),
                    longitude=float(fire_data[1]),
                    frp=float(fire_data[-2])
                )
                fires.append(fire)

            return fires
