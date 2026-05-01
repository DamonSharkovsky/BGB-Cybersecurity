from typing import List
from backend.repositories.home_repository import HomeRepository
from backend.repositories.area_repository import AreaRepository
from backend.schemas.home_dto import DashboardResponseDTO, TrendingThreatDTO, SafetyTipDTO, CommunityStatDTO, AreaDTO

class HomeService:
    def __init__(self, home_repo: HomeRepository, area_repo: AreaRepository):
        self.home_repo = home_repo
        self.area_repo = area_repo

    def get_dashboard_data(self) -> DashboardResponseDTO:
        threats = self.home_repo.get_all_trending_threats()
        tips = self.home_repo.get_all_safety_tips()
        stats = self.home_repo.get_all_community_stats()

        return DashboardResponseDTO(
            trending_threats=[TrendingThreatDTO.model_validate(t) for t in threats],
            safety_tips=[SafetyTipDTO.model_validate(t) for t in tips],
            community_stats=[CommunityStatDTO.model_validate(s) for s in stats]
        )

    def get_all_areas(self) -> List[AreaDTO]:
        areas = self.area_repo.get_all()
        return [AreaDTO.model_validate(a) for a in areas]
