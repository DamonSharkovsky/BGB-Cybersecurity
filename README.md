# SafeGuard Community Platform 🛡️

**SafeGuard Community** is a comprehensive cybersecurity awareness and community platform designed to protect users—with a focus on the Western Cape, South Africa—from emerging AI-powered threats like voice cloning, deepfakes, and sophisticated phishing.

## 🚀 Features

-   **Community Feed:** A centralized hub for sharing scam alerts, asking cybersecurity questions, and posting warnings.
-   **Local Area Communities:** Dedicated localized safety updates for the Western Cape.
-   **AI Threat Assistant:** A chat interface providing expert advice on AI-driven scams and digital safety.
-   **URL Scanner:** Integrated with the **VirusTotal API** for real-time link analysis.
-   **Resource Center:** Educational content and "Daily Safety Tips" for community awareness.
-   **Secure Authentication:** Layered security with hashed password storage and modern data validation.

## 🛠️ Tech Stack

### Backend (Layered Architecture)
-   **Python (Flask):** Robust RESTful API with structured routing.
-   **SQLAlchemy ORM:** Sophisticated data management with SQLite.
-   **Pydantic:** Strict data validation and serialization (DTOs).
-   **Pytest:** Comprehensive unit and integration test suite.
-   **python-dotenv:** Secure configuration management.

### Frontend (Provider/Service Pattern)
-   **Vanilla JavaScript (ES6+):** Modular architecture using ES6 modules.
-   **Provider/Service Pattern:** Decoupled UI and data access layers for scalability.
-   **HTML5 & CSS3:** Responsive, modern design.

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BGB-Cybersecurity
```

### 2. Set Up Virtual Environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/macOS
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment
Create a `.env` file in the root directory and add your API keys:
```env
VT_API_KEY=your_virustotal_api_key_here
FLASK_APP=backend/backendAPI.py
FLASK_ENV=development
DATABASE_URL=sqlite:///database.db
```

## 🏃 Running the Application

### Start the Unified Backend API
```bash
python backend/backendAPI.py
```
The server will start on `http://127.0.0.1:5501`. This unified instance handles the main API, URL scanning, and AI threat analysis.

### Launch the Frontend
Open `frontend/home/index.html` in your web browser. Using a local development server (like VS Code's "Live Server") is highly recommended.

## 🧪 Testing
Run the automated test suite to verify the application:
```bash
$env:PYTHONPATH = "."; python -m pytest
```

## 📂 Project Structure
-   `backend/models/`: Database entities.
-   `backend/repositories/`: Data access layer.
-   `backend/services/`: Core business logic.
-   `backend/schemas/`: Pydantic DTOs for data validation.
-   `frontend/shared/providers/`: API communication layer.
-   `frontend/shared/services/`: Frontend state and business logic.
-   `tests/`: Unit and integration test suite.

## 🛡️ License
This project was created for hackathon purposes.
