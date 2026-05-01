from pydantic import BaseModel

class AIAnalysisRequestDTO(BaseModel):
    question: str

class AIAnalysisResponseDTO(BaseModel):
    success: bool
    answer: str
    error: str = None
