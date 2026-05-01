from typing import List
from backend.models.post import Post
from backend.schemas.post_dto import PostCreateDTO, PostResponseDTO
from backend.repositories.interfaces import IPostRepository
from backend.services.interfaces import IPostService

class PostService(IPostService):
    def __init__(self, post_repo: IPostRepository):
        self.post_repo = post_repo

    def create_post(self, post_data: PostCreateDTO) -> PostResponseDTO:
        post = Post(
            type=post_data.type,
            title=post_data.title,
            content=post_data.content,
            location=post_data.location,
            author_id=post_data.author_id
        )
        
        saved_post = self.post_repo.save(post)
        return PostResponseDTO.model_validate(saved_post)

    def get_all_posts(self) -> List[PostResponseDTO]:
        posts = self.post_repo.get_all()
        return [PostResponseDTO.model_validate(p) for p in posts]

    def get_post_by_id(self, post_id: int) -> Optional[PostResponseDTO]:
        post = self.post_repo.get_by_id(post_id)
        if post:
            return PostResponseDTO.model_validate(post)
        return None
