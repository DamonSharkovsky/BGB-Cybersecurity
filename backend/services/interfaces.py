from abc import ABC, abstractmethod
from typing import List, Optional
from backend.schemas.user_dto import UserCreateDTO, UserLoginDTO, UserResponseDTO
from backend.schemas.post_dto import PostCreateDTO, PostResponseDTO
from backend.schemas.scanner_dto import UrlScanRequestDTO, UrlScanResultDTO
from backend.schemas.ai_dto import AIAnalysisRequestDTO, AIAnalysisResponseDTO

class IAuthService(ABC):
    @abstractmethod
    def register_user(self, user_data: UserCreateDTO) -> UserResponseDTO:
        pass

    @abstractmethod
    def authenticate_user(self, login_data: UserLoginDTO) -> Optional[UserResponseDTO]:
        pass

class IPostService(ABC):
    @abstractmethod
    def create_post(self, post_data: PostCreateDTO) -> PostResponseDTO:
        pass

    @abstractmethod
    def get_all_posts(self) -> List[PostResponseDTO]:
        pass

    @abstractmethod
    def get_post_by_id(self, post_id: int) -> Optional[PostResponseDTO]:
        pass

class IScannerService(ABC):
    @abstractmethod
    def scan_url(self, scan_data: UrlScanRequestDTO) -> UrlScanResultDTO:
        pass

class IAIService(ABC):
    @abstractmethod
    def analyze_threat(self, analysis_data: AIAnalysisRequestDTO) -> AIAnalysisResponseDTO:
        pass
