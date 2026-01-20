from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    DEVELOPER = "developer"
    CLIENT = "client"
    ADMIN = "admin"

class SkillTag(BaseModel):
    name: str
    confidence_score: float = 0.0  # AI inferred score 0-1.0
    verified: bool = False

class DeveloperProfile(BaseModel):
    bio: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    skills: List[SkillTag] = []
    available_for_work: bool = True
    total_earnings: float = 0.0
    
class ClientProfile(BaseModel):
    company_name: str
    industry: str
    website_url: Optional[str] = None
    billing_verified: bool = False

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")  # Firestore Doc ID
    email: EmailStr
    full_name: str
    role: UserRole
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Embedded Profiles (One will be set based on Role)
    developer_profile: Optional[DeveloperProfile] = None
    client_profile: Optional[ClientProfile] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
