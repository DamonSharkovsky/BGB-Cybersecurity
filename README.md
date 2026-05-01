# SafeGuard Community Platform 🛡️

**SafeGuard Community** is a comprehensive cybersecurity awareness and community platform developed for a hackathon. The project is specifically designed to protect users—with a focus on the Western Cape, South Africa—from emerging AI-powered threats like voice cloning, deepfakes, and sophisticated phishing.

## 🚀 Features

-   **Community Feed:** A centralized hub for users to share scam alerts, ask cybersecurity questions, and post warnings.
-   **Local Area Communities:** Dedicated feeds for specific areas in the Western Cape (e.g., Cape Town, Stellenbosch, Khayelitsha) to facilitate localized safety updates.
-   **AI Scam Reporting:** An intuitive interface for reporting suspicious activities, which are then stored for community awareness.
-   **URL Scanner:** Integrated with the **VirusTotal API** to allow users to check suspicious links for malicious content.
-   **Resource Center:** Educational articles and "Daily Safety Tips" to keep users informed about the latest AI-driven scams.
-   **Secure User Authentication:** Account creation and login functionality with secure, hashed password storage.

## 🛠️ Tech Stack

### Frontend
-   **HTML5 & CSS3:** For a responsive and modern user interface.
-   **Vanilla JavaScript (ES6+):** Handling dynamic UI updates, tab management, and API interactions.

### Backend
-   **Python (Flask):** Powering the RESTful API endpoints.
-   **SQLite:** A lightweight database for managing users and scam reports.
-   **Werkzeug:** For secure password hashing and verification.
-   **Requests:** For handling external API calls to VirusTotal.

## ⚙️ Setup & Installation

### Prerequisites
-   Python 3.x
-   Virtual Environment (optional but recommended)

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

## 🏃 Running the Application

### Start the Backend API
```bash
python backend/backendAPI.py
```
The backend server will start on `http://127.0.0.1:5501`.

### Start the URL Scanner API
```bash
python backend/vscanner.py
```
The scanner service runs as a separate Flask instance.

### Launch the Frontend
Simply open `frontend/home/index.html` in your preferred web browser. For the best experience, use a local development server like VS Code's "Live Server".

## 📂 Project Structure

-   `backend/`: Contains Flask routes, database logic (`db.py`), and utility scripts.
-   `frontend/`: Organized by feature (login, signup, scanner, etc.), containing HTML, CSS, and JS.
-   `frontend/shared/`: Core styles and JavaScript logic shared across the platform.
-   `database.db`: The local SQLite database file.

## 🛡️ License
This project was created for hackathon purposes.
