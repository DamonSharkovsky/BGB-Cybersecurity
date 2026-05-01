import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pydantic import ValidationError

from backend.db import db
from backend.repositories import UserRepository, PostRepository
from backend.services import AuthService, PostService
from backend.schemas import UserCreateDTO, UserLoginDTO, PostCreateDTO

app = Flask(__name__)
CORS(app)

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
# The database file is in the root, which is one level up from 'backend/'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(basedir), 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize Repositories and Services
user_repo = UserRepository()
post_repo = PostRepository()
auth_service = AuthService(user_repo)
post_service = PostService(post_repo)

# Ensure tables are created within app context
with app.app_context():
    db.create_all()

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = UserCreateDTO(**request.get_json())
        user_response = auth_service.register_user(data)
        return jsonify(user_response.model_dump()), 201
    except ValidationError as e:
        return jsonify(e.errors()), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = UserLoginDTO(**request.get_json())
        user_response = auth_service.authenticate_user(data)
        if user_response:
            return jsonify(user_response.model_dump()), 200
        return jsonify({"error": "Invalid credentials"}), 401
    except ValidationError as e:
        return jsonify(e.errors()), 400

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = post_service.get_all_posts()
    return jsonify([p.model_dump() for p in posts]), 200

@app.route('/api/posts', methods=['POST'])
def create_post():
    try:
        data = PostCreateDTO(**request.get_json())
        post_response = post_service.create_post(data)
        return jsonify(post_response.model_dump()), 201
    except ValidationError as e:
        return jsonify(e.errors()), 400

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post_response = post_service.get_post_by_id(post_id)
    if post_response:
        return jsonify(post_response.model_dump()), 200
    return jsonify({"error": "Post not found"}), 404

# Legacy route aliases for backward compatibility where possible
@app.route('/all', methods=['GET'])
def get_all_legacy():
    return get_posts()

@app.route('/signup', methods=['POST'])
def signup_legacy():
    return register()

@app.route('/login', methods=['POST'])
def login_legacy():
    return login()

if __name__ == "__main__":
    app.run(debug=True, port=5501)
