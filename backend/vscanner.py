import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
VT_API_KEY = os.getenv("VT_API_KEY")

if not VT_API_KEY:
    print("Warning: VT_API_KEY not found in environment variables.")

@app.route('/scan', methods=['POST'])
def scan_url():
    data = request.get_json()
    url_to_scan = data.get("url")
    
    if not url_to_scan:
        return jsonify({"error": "No URL provided"}), 400

    # Submit URL to VirusTotal
    vt_response = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers={"x-apikey": VT_API_KEY},
        data={"url": url_to_scan}
    )
    
    if vt_response.status_code != 200:
        return jsonify({"error": "Failed to contact VirusTotal"}), 500

    analysis_id = vt_response.json()["data"]["id"]

    # Retrieve analysis results
    result = requests.get(
        f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
        headers={"x-apikey": VT_API_KEY}
    ).json()

    # Simplified aggregation: count engines flagged
    stats = result.get("data", {}).get("attributes", {}).get("stats", {})
    flagged = stats.get("malicious", 0)
    total = sum(stats.values())

    verdict = "SAFE" if flagged == 0 else "SUSPICIOUS" if flagged < total/2 else "MALICIOUS"

    return jsonify({
        "verdict": verdict,
        "flagged": flagged,
        "total_engines": total
    })

if __name__ == "__main__":
    app.run(debug=True)
