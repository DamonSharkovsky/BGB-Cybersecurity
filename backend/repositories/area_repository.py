from typing import List
from backend.models import Area
from backend.db import db

class AreaRepository:
    def get_all(self) -> List[Area]:
        return Area.query.order_by(Area.name).all()
