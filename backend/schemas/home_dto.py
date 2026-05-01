from pydantic import BaseModel, ConfigDict
from typing import List

class TrendingThreatDTO(BaseModel):
    id: int
    name: str
    report_count: int
    model_config = ConfigDict(from_attributes=True)

class SafetyTipDTO(BaseModel):
    id: int
    title: str
    content: str
    model_config = ConfigDict(from_attributes=True)

class CommunityStatDTO(BaseModel):
    id: int
    label: str
    value: str
    model_config = ConfigDict(from_attributes=True)

class AreaDTO(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)

class DashboardResponseDTO(BaseModel):
    trending_threats: List[TrendingThreatDTO]
    safety_tips: List[SafetyTipDTO]
    community_stats: List[CommunityStatDTO]
