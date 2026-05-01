from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class PostBaseDTO(BaseModel):
    type: str
    title: str
    content: str
    location: str

class PostCreateDTO(PostBaseDTO):
    author_id: int

class PostResponseDTO(PostBaseDTO):
    id: int
    author_id: int
    created_at: datetime
    upvotes: int

    class Config:
        from_attributes = True
