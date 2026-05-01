import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pydantic import ValidationError
from dotenv import load_dotenv

from backend.db import db
from backend.repositories import UserRepository, PostRepository, HomeRepository, AreaRepository
from backend.services import AuthService, PostService, ScannerService, AIService, HomeService
from backend.schemas import UserCreateDTO, UserLoginDTO, PostCreateDTO, UrlScanRequestDTO, AIAnalysisRequestDTO

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
default_db_url = 'sqlite:///' + os.path.join(os.path.dirname(basedir), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', default_db_url)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize Repositories and Services
user_repo = UserRepository()
post_repo = PostRepository()
home_repo = HomeRepository()
area_repo = AreaRepository()

auth_service = AuthService(user_repo)
post_service = PostService(post_repo)
scanner_service = ScannerService()
ai_service = AIService()
home_service = HomeService(home_repo, area_repo)

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

@app.route('/api/home/dashboard', methods=['GET'])
def get_dashboard():
    dashboard_data = home_service.get_dashboard_data()
    return jsonify(dashboard_data.model_dump()), 200

@app.route('/api/areas', methods=['GET'])
def get_areas():
    areas = home_service.get_all_areas()
    return jsonify([a.model_dump() for a in areas]), 200

@app.route('/api/scan', methods=['POST'])
def scan_url():
    try:
        data = UrlScanRequestDTO(**request.get_json())
        result = scanner_service.scan_url(data)
        return jsonify(result.model_dump()), 200
    except ValidationError as e:
        return jsonify(e.errors()), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ai/analyze', methods=['POST'])
def analyze_threat():
    try:
        data = AIAnalysisRequestDTO(**request.get_json())
        result = ai_service.analyze_threat(data)
        return jsonify(result.model_dump()), 200
    except ValidationError as e:
        return jsonify(e.errors()), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
