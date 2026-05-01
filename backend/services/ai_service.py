from backend.schemas.ai_dto import AIAnalysisRequestDTO, AIAnalysisResponseDTO
from backend.services.interfaces import IAIService

class AIService(IAIService):
    def analyze_threat(self, analysis_data: AIAnalysisRequestDTO) -> AIAnalysisResponseDTO:
        question = analysis_data.question.lower()
        
        # Simple placeholder logic for threat analysis
        if "voice" in question or "call" in question:
            answer = "🎙️ AI Voice Cloning detected. Red flags: Urgency, requests for money, unnatural pauses."
        elif "deepfake" in question or "video" in question:
            answer = "📹 Deepfake Video alert. Watch for unnatural eye movements and facial inconsistencies."
        elif "email" in question or "phishing" in question:
            answer = "📧 AI Phishing suspected. Look for perfect grammar combined with suspicious links."
        else:
            answer = "🤖 I am analyzing your request. Please be cautious of any unsolicited contact or requests for personal information."
            
        return AIAnalysisResponseDTO(
            success=True,
            answer=answer
        )
