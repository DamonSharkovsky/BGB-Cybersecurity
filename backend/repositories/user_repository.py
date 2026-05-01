from typing import List, Optional
from backend.db import db
from backend.models.user import User
from backend.repositories.interfaces import IUserRepository

class UserRepository(IUserRepository):
    def get_by_id(self, user_id: int) -> Optional[User]:
        return db.session.get(User, user_id)

    def get_by_email(self, email: str) -> Optional[User]:
        return User.query.filter_by(email=email).first()

    def save(self, user: User) -> User:
        db.session.add(user)
        db.session.commit()
        return user
