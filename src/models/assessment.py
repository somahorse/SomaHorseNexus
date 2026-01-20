from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from src.models.user import SkillTag

class ChallengeType(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    description: str
    dataset_url: str
    starter_code: str
    passing_accuracy: float = 0.85

class Submission(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    developer_id: str
    challenge_id: str
    
    code_content: str
    model_accuracy: float
    
    # Result
    passed: bool = False
    feedback: str
    extracted_skills: List[SkillTag] = []
    
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
