from abc import ABC, abstractmethod
from typing import List, Optional
from backend.models.user import User
from backend.models.post import Post

class IUserRepository(ABC):
    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    def save(self, user: User) -> User:
        pass

class IPostRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Post]:
        pass

    @abstractmethod
    def get_by_id(self, post_id: int) -> Optional[Post]:
        pass

    @abstractmethod
    def save(self, post: Post) -> Post:
        pass
