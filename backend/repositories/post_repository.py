from typing import List, Optional
from backend.db import db
from backend.models.post import Post
from backend.repositories.interfaces import IPostRepository

class PostRepository(IPostRepository):
    def get_all(self) -> List[Post]:
        return Post.query.order_by(Post.created_at.desc()).all()

    def get_by_id(self, post_id: int) -> Optional[Post]:
        return db.session.get(Post, post_id)

    def save(self, post: Post) -> Post:
        db.session.add(post)
        db.session.commit()
        return post
