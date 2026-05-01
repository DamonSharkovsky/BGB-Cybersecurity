from typing import List
from backend.models import TrendingThreat, SafetyTip, CommunityStat
from backend.db import db

class HomeRepository:
    def get_all_trending_threats(self) -> List[TrendingThreat]:
        return TrendingThreat.query.order_by(TrendingThreat.report_count.desc()).all()

    def get_all_safety_tips(self) -> List[SafetyTip]:
        return SafetyTip.query.all()

    def get_all_community_stats(self) -> List[CommunityStat]:
        return CommunityStat.query.all()
