from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from src.matching.service import MatchingService
from src.models.assignment import ProjectCollaboration, TalentNotification, ChatMessage

router = APIRouter(prefix="/matching", tags=["Matching & Collaboration"])

# Request/Response Schemas
class AutoAssignRequest(BaseModel):
    project_id: str
    client_id: str
    client_name: str
    client_email: str
    service_type: str
    tier: str


class ProgressUpdateRequest(BaseModel):
    talent_id: str
    talent_name: str
    progress_percentage: int
    message: str


class SendMessageRequest(BaseModel):
    sender_id: str
    sender_name: str
    sender_role: str  # "talent" or "client"
    message: str
    is_question: bool = False


class AnswerQuestionRequest(BaseModel):
    question_index: int
    answer: str


class AcceptAssignmentRequest(BaseModel):
    talent_id: str


# Initialize service
def get_matching_service() -> MatchingService:
    return MatchingService()


@router.post("/auto-assign", response_model=dict)
async def auto_assign_talent(
    request: AutoAssignRequest,
    service: MatchingService = Depends(get_matching_service)
):
    """
    Automatically match and assign talent to a project based on skills.
    Called when a client completes project onboarding.
    """
    try:
        collaboration = await service.auto_assign_talent(
            project_id=request.project_id,
            client_id=request.client_id,
            client_name=request.client_name,
            client_email=request.client_email,
            service_type=request.service_type,
            tier=request.tier
        )
        
        return {
            "success": True,
            "collaboration_id": collaboration.id,
            "assigned_count": len(collaboration.assigned_talent),
            "estimated_duration_days": collaboration.estimated_duration_days,
            "deadline": collaboration.deadline.isoformat() if collaboration.deadline else None,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/find-talent/{service_type}/{tier}")
async def find_matching_talent(
    service_type: str,
    tier: str,
    service: MatchingService = Depends(get_matching_service)
):
    """
    Find and rank available talent for a project without assigning them.
    Useful for previewing potential matches.
    """
    try:
        candidates = await service.find_matching_talent(service_type, tier)
        return {
            "success": True,
            "candidates": candidates,
            "count": len(candidates)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/collaboration/{collaboration_id}")
async def get_collaboration(
    collaboration_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Get a specific project collaboration by ID."""
    collaboration = await service.get_collaboration(collaboration_id)
    if not collaboration:
        raise HTTPException(status_code=404, detail="Collaboration not found")
    
    return collaboration.model_dump(by_alias=True)


@router.get("/collaborations/talent/{talent_id}")
async def get_talent_collaborations(
    talent_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Get all project collaborations for a specific talent."""
    collaborations = await service.get_talent_collaborations(talent_id)
    return {
        "success": True,
        "collaborations": [c.model_dump(by_alias=True) for c in collaborations],
        "count": len(collaborations)
    }


@router.get("/collaborations/client/{client_id}")
async def get_client_collaborations(
    client_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Get all project collaborations for a specific client."""
    collaborations = await service.get_client_collaborations(client_id)
    return {
        "success": True,
        "collaborations": [c.model_dump(by_alias=True) for c in collaborations],
        "count": len(collaborations)
    }


@router.post("/collaboration/{collaboration_id}/progress")
async def update_progress(
    collaboration_id: str,
    request: ProgressUpdateRequest,
    service: MatchingService = Depends(get_matching_service)
):
    """Update project progress (called by talent)."""
    try:
        collaboration = await service.update_progress(
            collaboration_id=collaboration_id,
            talent_id=request.talent_id,
            talent_name=request.talent_name,
            progress_percentage=request.progress_percentage,
            message=request.message
        )
        return {
            "success": True,
            "overall_progress": collaboration.overall_progress,
            "status": collaboration.status
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/collaboration/{collaboration_id}/message")
async def send_message(
    collaboration_id: str,
    request: SendMessageRequest,
    service: MatchingService = Depends(get_matching_service)
):
    """Send a chat message in the project collaboration."""
    try:
        message = await service.send_message(
            collaboration_id=collaboration_id,
            sender_id=request.sender_id,
            sender_name=request.sender_name,
            sender_role=request.sender_role,
            message=request.message,
            is_question=request.is_question
        )
        return {
            "success": True,
            "message": message.model_dump()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/collaboration/{collaboration_id}/answer")
async def answer_question(
    collaboration_id: str,
    request: AnswerQuestionRequest,
    service: MatchingService = Depends(get_matching_service)
):
    """Client answers a clarification question from talent."""
    try:
        question = await service.answer_question(
            collaboration_id=collaboration_id,
            question_index=request.question_index,
            answer=request.answer
        )
        return {
            "success": True,
            "question": question.model_dump()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/collaboration/{collaboration_id}/accept")
async def accept_assignment(
    collaboration_id: str,
    request: AcceptAssignmentRequest,
    service: MatchingService = Depends(get_matching_service)
):
    """Talent accepts their project assignment."""
    try:
        collaboration = await service.accept_assignment(
            collaboration_id=collaboration_id,
            talent_id=request.talent_id
        )
        return {
            "success": True,
            "status": collaboration.status
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/notifications/{talent_id}")
async def get_notifications(
    talent_id: str,
    unread_only: bool = False,
    service: MatchingService = Depends(get_matching_service)
):
    """Get all notifications for a talent."""
    notifications = await service.get_talent_notifications(talent_id, unread_only)
    return {
        "success": True,
        "notifications": [n.model_dump(by_alias=True) for n in notifications],
        "count": len(notifications)
    }


@router.post("/notifications/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Mark a talent notification as read."""
    try:
        await service.mark_notification_read(notification_id)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/notifications/client/{client_id}")
async def get_client_notifications(
    client_id: str,
    unread_only: bool = False,
    service: MatchingService = Depends(get_matching_service)
):
    """Get all notifications for a client."""
    notifications = await service.get_client_notifications(client_id, unread_only)
    return {
        "success": True,
        "notifications": notifications,
        "count": len(notifications)
    }


@router.post("/notifications/client/{notification_id}/read")
async def mark_client_notification_read(
    notification_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Mark a client notification as read."""
    try:
        await service.mark_client_notification_read(notification_id)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/notifications/admin")
async def get_admin_notifications(
    unread_only: bool = False,
    service: MatchingService = Depends(get_matching_service)
):
    """Get all admin notifications."""
    notifications = await service.get_admin_notifications(unread_only)
    return {
        "success": True,
        "notifications": notifications,
        "count": len(notifications)
    }


@router.post("/notifications/admin/{notification_id}/read")
async def mark_admin_notification_read(
    notification_id: str,
    service: MatchingService = Depends(get_matching_service)
):
    """Mark an admin notification as read."""
    try:
        await service.mark_admin_notification_read(notification_id)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
