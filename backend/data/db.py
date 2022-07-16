from typing import List, Dict, Any, NewType

from models.fire import FirePoint


CashedPoints = NewType("CashedPoints", Dict[str, Any])

fire_points: List[FirePoint] = []
cashed_points: List[CashedPoints] = []


def get_fire_points() -> List[FirePoint]:
    return fire_points


def add_fire_point(fire_point: FirePoint) -> None:
    fire_points.append(fire_point)


def clear_fire_points() -> None:
    global fire_points

    fire_points = []


def set_cached_points(data: List[CashedPoints]) -> None:
    global cashed_points

    cashed_points = data


def get_cached_points() -> List[CashedPoints]:
    return cashed_points
