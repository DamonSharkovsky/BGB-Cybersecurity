import pytest
from backend.services.scanner_service import ScannerService
from backend.schemas.scanner_dto import UrlScanRequestDTO
from backend.services.ai_service import AIService
from backend.schemas.ai_dto import AIAnalysisRequestDTO

def test_scanner_service_no_api_key(mocker):
    mocker.patch('os.getenv', return_value=None)
    service = ScannerService()
    with pytest.raises(Exception, match="VirusTotal API Key not configured"):
        service.scan_url(UrlScanRequestDTO(url="http://example.com"))

def test_ai_service_voice(mocker):
    service = AIService()
    result = service.analyze_threat(AIAnalysisRequestDTO(question="Tell me about voice cloning"))
    assert result.success is True
    assert "Voice Cloning" in result.answer

def test_ai_service_deepfake(mocker):
    service = AIService()
    result = service.analyze_threat(AIAnalysisRequestDTO(question="What is a deepfake?"))
    assert result.success is True
    assert "Deepfake Video" in result.answer
