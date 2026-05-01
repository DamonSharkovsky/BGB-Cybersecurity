import pytest
from datetime import date, datetime
from backend.services.auth_service import AuthService
from backend.schemas.user_dto import UserCreateDTO, UserLoginDTO, UserResponseDTO
from backend.models.user import User

def test_register_user(mocker):
    # Arrange
    mock_repo = mocker.Mock()
    # Mock the save method to return a User instance
    mock_user = User(
        id=1,
        name="John",
        surname="Doe",
        email="john@example.com",
        phone="1234567890",
        password_hash="hashed_password",
        dob=date(1990, 1, 1),
        gender="male",
        created_at=datetime.utcnow()
    )
    mock_repo.save.return_value = mock_user
    
    auth_service = AuthService(mock_repo)
    user_data = UserCreateDTO(
        name="John",
        surname="Doe",
        email="john@example.com",
        phone="1234567890",
        password="securepassword",
        dob=date(1990, 1, 1),
        gender="male"
    )

    # Act
    result = auth_service.register_user(user_data)

    # Assert
    assert result.email == "john@example.com"
    assert result.id == 1
    mock_repo.save.assert_called_once()
    # Verify password was hashed (not stored as plain text)
    saved_user = mock_repo.save.call_args[0][0]
    assert saved_user.password_hash != "securepassword"

def test_authenticate_user_success(mocker):
    # Arrange
    from werkzeug.security import generate_password_hash
    mock_repo = mocker.Mock()
    hashed = generate_password_hash("password123")
    mock_user = User(
        id=1,
        email="john@example.com",
        password_hash=hashed,
        name="John",
        surname="Doe",
        phone="123",
        dob=date(1990, 1, 1),
        gender="male",
        created_at=datetime.utcnow()
    )
    mock_repo.get_by_email.return_value = mock_user
    
    auth_service = AuthService(mock_repo)
    login_data = UserLoginDTO(email="john@example.com", password="password123")

    # Act
    result = auth_service.authenticate_user(login_data)

    # Assert
    assert result is not None
    assert result.email == "john@example.com"
    mock_repo.get_by_email.assert_called_once_with("john@example.com")

def test_authenticate_user_failure(mocker):
    # Arrange
    mock_repo = mocker.Mock()
    mock_repo.get_by_email.return_value = None
    
    auth_service = AuthService(mock_repo)
    login_data = UserLoginDTO(email="wrong@example.com", password="any")

    # Act
    result = auth_service.authenticate_user(login_data)

    # Assert
    assert result is None
