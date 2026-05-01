from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.user import User
from backend.schemas.user_dto import UserCreateDTO, UserLoginDTO, UserResponseDTO
from backend.repositories.interfaces import IUserRepository
from backend.services.interfaces import IAuthService

class AuthService(IAuthService):
    def __init__(self, user_repo: IUserRepository):
        self.user_repo = user_repo

    def register_user(self, user_data: UserCreateDTO) -> UserResponseDTO:
        hashed_password = generate_password_hash(user_data.password)
        
        user = User(
            name=user_data.name,
            surname=user_data.surname,
            email=user_data.email,
            phone=user_data.phone,
            password_hash=hashed_password,
            dob=user_data.dob,
            gender=user_data.gender
        )
        
        saved_user = self.user_repo.save(user)
        return UserResponseDTO.model_validate(saved_user)

    def authenticate_user(self, login_data: UserLoginDTO) -> Optional[UserResponseDTO]:
        user = self.user_repo.get_by_email(login_data.email)
        
        if user and check_password_hash(user.password_hash, login_data.password):
            return UserResponseDTO.model_validate(user)
        
        return None
