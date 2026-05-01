# SafeGuard Community Platform 🛡️

**SafeGuard Community** is a comprehensive cybersecurity awareness and community platform designed to protect users—with a focus on the Western Cape, South Africa—from emerging AI-powered threats like voice cloning, deepfakes, and sophisticated phishing.

## 🚀 Features

-   **Community Feed:** A centralized hub for sharing scam alerts, asking cybersecurity questions, and posting warnings, featuring real-time user metadata and comment counts.
-   **Local Area Communities:** Dedicated localized safety updates for the Western Cape with dynamic area selection.
-   **Home Dashboard:** Dynamic sidebar widgets featuring "Trending Threats," "Daily Safety Tips," and "Community Stats" updated directly from the backend.
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

### Frontend (React SPA)
-   **React 19:** Modern component-based architecture.
-   **Vite:** Ultra-fast build tool and development server.
-   **React Router 7:** Robust client-side routing.
-   **Context API:** Global state management for authentication.
-   **Custom Hooks:** Encapsulated business logic and data fetching.

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BGB-Cybersecurity
```

### 2. Backend Setup
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd frontend-react
npm install
```

### 4. Configure Environment
Create a `.env` file in the root directory and add your API keys:
```env
VT_API_KEY=your_virustotal_api_key_here
```

## 🏃 Running the Application

### 1. Start the Backend API
```bash
python -m backend.backendAPI
```
The server will start on `http://127.0.0.1:5501`.

### 2. Start the Frontend
```bash
cd frontend-react
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🧪 Testing
Run the automated test suite to verify the application:
```bash
$env:PYTHONPATH = "."; python -m pytest
```

## 📂 Project Structure
-   `backend/`: Flask layered architecture (Models, Repositories, Services, Schemas).
-   `frontend-react/`: React SPA source code (API, Components, Context, Hooks, Pages).
-   `frontend/`: Legacy Vanilla JS frontend.
-   `tests/`: Unit and integration test suite.

## 🛡️ License
This project was created for hackathon purposes.
