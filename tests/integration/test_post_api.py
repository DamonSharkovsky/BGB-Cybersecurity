import json
from datetime import date
from backend.models.user import User
from werkzeug.security import generate_password_hash

def test_create_and_get_posts(client, db):
    # 1. Create a user to be the author
    with client.application.app_context():
        user = User(
            name="Author",
            surname="User",
            email="author@example.com",
            phone="1112223333",
            password_hash=generate_password_hash("pass"),
            dob=date(1990, 1, 1),
            gender="male"
        )
        db.session.add(user)
        db.session.commit()
        author_id = user.id

    # 2. Create a post
    post_payload = {
        "type": "SCAM_ALERT",
        "title": "Integration Test Post",
        "content": "Testing the full flow",
        "location": "Cape Town",
        "author_id": author_id
    }
    
    create_response = client.post(
        "/api/posts",
        data=json.dumps(post_payload),
        content_type="application/json"
    )
    
    assert create_response.status_code == 201
    post_data = create_response.get_json()
    assert post_data["title"] == "Integration Test Post"

    # 3. Get all posts
    get_response = client.get("/api/posts")
    assert get_response.status_code == 200
    all_posts = get_response.get_json()
    assert len(all_posts) >= 1
    assert all_posts[0]["title"] == "Integration Test Post"

    # 4. Get post by id
    post_id = post_data["id"]
    get_one_response = client.get(f"/api/posts/{post_id}")
    assert get_one_response.status_code == 200
    assert get_one_response.get_json()["title"] == "Integration Test Post"
