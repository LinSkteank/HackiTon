from pydantic import BaseModel


class Fire(BaseModel):
    latitude: float
    longitude: float
    frp: float  # MW(megawatts)


class FirePoint(Fire):
    count: int
