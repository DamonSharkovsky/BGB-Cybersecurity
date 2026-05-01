from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import date, datetime
from typing import Optional

class UserBaseDTO(BaseModel):
    name: str
    surname: str
    email: EmailStr
    phone: str
    dob: date
    gender: str

class UserCreateDTO(UserBaseDTO):
    password: str = Field(..., min_length=8)

class UserLoginDTO(BaseModel):
    email: EmailStr
    password: str

class UserResponseDTO(UserBaseDTO):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
