import os
import requests
from backend.schemas.scanner_dto import UrlScanRequestDTO, UrlScanResultDTO
from backend.services.interfaces import IScannerService

class ScannerService(IScannerService):
    def __init__(self):
        self.api_key = os.getenv("VT_API_KEY")

    def scan_url(self, scan_data: UrlScanRequestDTO) -> UrlScanResultDTO:
        if not self.api_key:
            raise Exception("VirusTotal API Key not configured")

        # Submit URL to VirusTotal
        vt_response = requests.post(
            "https://www.virustotal.com/api/v3/urls",
            headers={"x-apikey": self.api_key},
            data={"url": scan_data.url}
        )
        
        if vt_response.status_code != 200:
            raise Exception(f"Failed to contact VirusTotal: {vt_response.status_code}")

        analysis_id = vt_response.json()["data"]["id"]

        # Retrieve analysis results
        result_response = requests.get(
            f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
            headers={"x-apikey": self.api_key}
        )
        
        if result_response.status_code != 200:
            raise Exception("Failed to retrieve analysis results")
            
        result = result_response.json()

        # Simplified aggregation: count engines flagged
        stats = result.get("data", {}).get("attributes", {}).get("stats", {})
        flagged = stats.get("malicious", 0)
        total = sum(stats.values())

        verdict = "SAFE" if flagged == 0 else "SUSPICIOUS" if flagged < total/2 else "MALICIOUS"

        return UrlScanResultDTO(
            verdict=verdict,
            flagged=flagged,
            total_engines=total
        )
