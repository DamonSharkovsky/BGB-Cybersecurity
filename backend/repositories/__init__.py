from backend.repositories.interfaces import IUserRepository, IPostRepository
from backend.repositories.user_repository import UserRepository
from backend.repositories.post_repository import PostRepository

__all__ = ['IUserRepository', 'IPostRepository', 'UserRepository', 'PostRepository']
