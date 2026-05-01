from pydantic import BaseModel, ConfigDict
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
    author_name: str
    created_at: datetime
    upvotes: int
    comment_count: int

    model_config = ConfigDict(from_attributes=True)
