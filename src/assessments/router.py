from fastapi import APIRouter, HTTPException, Depends
from typing import List
from src.models.assessment import ChallengeType, Submission
from src.assessments.service import AssessmentService

router = APIRouter(tags=["Assessments"], prefix="/assessments")

def get_service():
    return AssessmentService()

@router.get("/challenges", response_model=List[ChallengeType])
async def get_challenges(service: AssessmentService = Depends(get_service)):
    """
    Get the list of active coding challenges for onboarding.
    """
    return await service.get_challenges()

@router.post("/submit", response_model=Submission)
async def submit_solution(submission: Submission, service: AssessmentService = Depends(get_service)):
    """
    Developer submits code. System grades it and returns Pass/Fail result + extracted skills.
    """
    return await service.submit_solution(submission)
