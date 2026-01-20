from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum
from datetime import datetime
from src.models.user import SkillTag

class ProjectTier(str, Enum):
    BASIC = "basic"
    STANDARD = "standard"
    PREMIUM = "premium"

class ProjectStatus(str, Enum):
    DRAFT = "draft"
    OPEN = "open"           # Waiting for match
    MATCHED = "matched"     # Team assigned
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class ROIForecast(BaseModel):
    estimated_savings_percentage: float
    estimated_roi_multiplier: float  # e.g. 3.0 for 300%
    confidence_score: float

class ServiceCatalogItem(BaseModel):
    """
    Represents a productized service (e.g. 'Fraud Detection')
    """
    id: str = Field(..., alias="_id")
    name: str
    description: str
    base_price: float
    tiers: Dict[ProjectTier, Dict[str, str]] # e.g. {'basic': {'delivery': '2 weeks'}}

class Project(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    client_id: str
    service_type: str # e.g. "Fraud Detection"
    tier: ProjectTier
    
    status: ProjectStatus = ProjectStatus.DRAFT
    
    # Matching
    required_skills: List[str]
    assigned_team_ids: List[str] = [] # Developer IDs
    match_score: Optional[float] = None
    
    # Financials
    budget: float
    roi_forecast: Optional[ROIForecast] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
