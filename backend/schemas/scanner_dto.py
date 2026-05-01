from pydantic import BaseModel

class UrlScanRequestDTO(BaseModel):
    url: str

class UrlScanResultDTO(BaseModel):
    verdict: str
    flagged: int
    total_engines: int
