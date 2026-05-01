import json

def test_api_register_and_login(client):
    # 1. Register a new user
    user_payload = {
        "name": "Jane",
        "surname": "Doe",
        "email": "jane@example.com",
        "phone": "0987654321",
        "password": "strongpassword123",
        "dob": "1995-05-05",
        "gender": "female"
    }
    
    reg_response = client.post(
        "/api/auth/register",
        data=json.dumps(user_payload),
        content_type="application/json"
    )
    
    assert reg_response.status_code == 201
    data = reg_response.get_json()
    assert data["email"] == "jane@example.com"
    assert "id" in data

    # 2. Login with the registered user
    login_payload = {
        "email": "jane@example.com",
        "password": "strongpassword123"
    }
    
    login_response = client.post(
        "/api/auth/login",
        data=json.dumps(login_payload),
        content_type="application/json"
    )
    
    assert login_response.status_code == 200
    login_data = login_response.get_json()
    assert login_data["email"] == "jane@example.com"

def test_api_login_invalid_credentials(client):
    login_payload = {
        "email": "nonexistent@example.com",
        "password": "any"
    }
    
    response = client.post(
        "/api/auth/login",
        data=json.dumps(login_payload),
        content_type="application/json"
    )
    
    assert response.status_code == 401
    assert "error" in response.get_json()
