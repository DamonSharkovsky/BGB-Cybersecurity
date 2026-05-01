import pytest
from datetime import datetime
from backend.services.post_service import PostService
from backend.schemas.post_dto import PostCreateDTO, PostResponseDTO
from backend.models.post import Post

def test_create_post(mocker):
    # Arrange
    mock_repo = mocker.Mock()
    mock_post = Post(
        id=1,
        type="SCAM_ALERT",
        title="Test Title",
        content="Test Content",
        location="Test Location",
        author_id=1,
        created_at=datetime.utcnow(),
        upvotes=0
    )
    mock_repo.save.return_value = mock_post
    
    post_service = PostService(mock_repo)
    post_data = PostCreateDTO(
        type="SCAM_ALERT",
        title="Test Title",
        content="Test Content",
        location="Test Location",
        author_id=1
    )

    # Act
    result = post_service.create_post(post_data)

    # Assert
    assert result.title == "Test Title"
    assert result.id == 1
    mock_repo.save.assert_called_once()

def test_get_all_posts(mocker):
    # Arrange
    mock_repo = mocker.Mock()
    mock_posts = [
        Post(id=1, type="A", title="T1", content="C1", location="L1", author_id=1, created_at=datetime.utcnow(), upvotes=0),
        Post(id=2, type="B", title="T2", content="C2", location="L2", author_id=1, created_at=datetime.utcnow(), upvotes=0)
    ]
    mock_repo.get_all.return_value = mock_posts
    
    post_service = PostService(mock_repo)

    # Act
    result = post_service.get_all_posts()

    # Assert
    assert len(result) == 2
    assert result[0].title == "T1"
    mock_repo.get_all.assert_called_once()
