from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum
from datetime import datetime


class AssignmentStatus(str, Enum):
    PENDING = "pending"          # Talent hasn't accepted yet
    ACCEPTED = "accepted"        # Talent accepted the assignment
    DECLINED = "declined"        # Talent declined
    IN_PROGRESS = "in_progress"  # Work has started
    COMPLETED = "completed"      # Work is done


class TalentAssignment(BaseModel):
    """
    Represents a single talent's assignment to a project
    """
    talent_id: str
    talent_name: str
    talent_email: str
    skills_matched: List[str]  # Skills that matched for this assignment
    match_score: float  # 0-100 score
    status: AssignmentStatus = AssignmentStatus.PENDING
    assigned_at: datetime = Field(default_factory=datetime.utcnow)
    accepted_at: Optional[datetime] = None


class ProgressUpdate(BaseModel):
    """
    Progress update from the team
    """
    id: Optional[str] = None
    updated_by: str  # Talent ID
    updated_by_name: str
    progress_percentage: int  # 0-100
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatMessage(BaseModel):
    """
    Chat message in project discussion
    """
    id: Optional[str] = None
    sender_id: str
    sender_name: str
    sender_role: str  # "talent" or "client"
    message: str
    is_question: bool = False  # Flag for clarification questions
    is_answered: bool = False  # For questions, whether answered
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ClarificationQuestion(BaseModel):
    """
    Question from talent to client for project clarification
    """
    id: Optional[str] = None
    asked_by: str  # Talent ID
    asked_by_name: str
    question: str
    answer: Optional[str] = None
    answered_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ProjectCollaboration(BaseModel):
    """
    Main collaboration document for a project - contains all collaboration data
    """
    id: Optional[str] = Field(None, alias="_id")
    project_id: str
    client_id: str
    client_name: str
    client_email: str
    
    # Project details
    service_type: str
    tier: str
    estimated_duration_days: int
    deadline: Optional[datetime] = None
    
    # Team assignments
    assigned_talent: List[TalentAssignment] = []
    
    # Progress tracking
    overall_progress: int = 0  # 0-100
    progress_updates: List[ProgressUpdate] = []
    
    # Communication
    chat_messages: List[ChatMessage] = []
    clarification_questions: List[ClarificationQuestion] = []
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    # Status
    status: str = "matching"  # matching, assigned, in_progress, completed

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}


class TalentNotification(BaseModel):
    """
    Notification for talent about project assignments
    """
    id: Optional[str] = Field(None, alias="_id")
    talent_id: str
    project_id: str
    collaboration_id: str
    type: str  # "assignment", "message", "question_answered", "progress_request"
    title: str
    message: str
    read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
