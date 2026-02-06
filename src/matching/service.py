from typing import List, Optional, Dict, Tuple
from datetime import datetime, timedelta
from src.database import get_db
from src.models.assignment import (
    ProjectCollaboration,
    TalentAssignment,
    AssignmentStatus,
    TalentNotification,
    ProgressUpdate,
    ChatMessage,
    ClarificationQuestion
)

# Skill requirements mapping for each service type
SERVICE_SKILL_REQUIREMENTS: Dict[str, List[str]] = {
    "credit-scoring": [
        "Python", "Machine Learning", "Data Science", "TensorFlow", 
        "Scikit-learn", "SQL", "Pandas", "Statistics", "Financial Modeling"
    ],
    "fraud-detection": [
        "Python", "Machine Learning", "Anomaly Detection", "Real-time Systems",
        "TensorFlow", "Deep Learning", "SQL", "Data Engineering", "Security"
    ],
    "payment-gateway": [
        "API Development", "Node.js", "Python", "Payment Systems",
        "Security", "Database", "AWS", "Docker", "Microservices"
    ],
}

# Tier configurations for team size and duration
TIER_CONFIG = {
    "basic": {"team_size": 2, "duration_weeks": 5},
    "standard": {"team_size": 3, "duration_weeks": 3},
    "premium": {"team_size": 5, "duration_weeks": 1.5},
}


class MatchingService:
    def __init__(self):
        self.db = get_db()
        self.collaborations = self.db.collection("project_collaborations")
        self.notifications = self.db.collection("talent_notifications")
        self.client_notifications = self.db.collection("client_notifications")
        self.admin_notifications = self.db.collection("admin_notifications")
        self.users = self.db.collection("users")

    def calculate_skill_match_score(
        self, 
        talent_skills: List[Dict], 
        required_skills: List[str]
    ) -> Tuple[float, List[str]]:
        """
        Calculate match score between talent skills and project requirements.
        Returns (score, list of matched skills)
        
        Algorithm:
        - Base score from skill overlap percentage
        - Bonus for verified skills
        - Bonus for high confidence scores
        """
        if not talent_skills or not required_skills:
            return 0.0, []
        
        matched_skills = []
        total_score = 0.0
        
        # Normalize required skills for comparison
        required_lower = [s.lower() for s in required_skills]
        
        for skill in talent_skills:
            skill_name = skill.get("name", "").lower()
            
            # Check for exact or partial match
            for req_skill in required_lower:
                if skill_name == req_skill or skill_name in req_skill or req_skill in skill_name:
                    matched_skills.append(skill.get("name", skill_name))
                    
                    # Base score for match
                    base_score = 10.0
                    
                    # Bonus for confidence
                    confidence = skill.get("confidence_score", 0.5)
                    confidence_bonus = confidence * 5.0
                    
                    # Bonus for verified skills
                    verified_bonus = 10.0 if skill.get("verified", False) else 0.0
                    
                    total_score += base_score + confidence_bonus + verified_bonus
                    break
        
        # Calculate percentage of required skills matched
        coverage = len(matched_skills) / len(required_skills) if required_skills else 0
        
        # Final score: combination of raw score and coverage
        # Max possible per skill = 25, normalize to 100
        max_possible = len(required_skills) * 25
        normalized_score = (total_score / max_possible) * 100 if max_possible > 0 else 0
        
        # Weight by coverage (matching more skills is better)
        final_score = normalized_score * (0.5 + 0.5 * coverage)
        
        return min(final_score, 100.0), matched_skills

    async def find_matching_talent(
        self, 
        service_type: str, 
        tier: str,
        exclude_ids: List[str] = []
    ) -> List[Dict]:
        """
        Find and rank all available talent for a project based on skills.
        Returns sorted list of talent with match scores.
        
        Algorithm:
        1. First, find talent with matching skills
        2. If not enough matches, include available (unassigned) talent as fallback
        """
        required_skills = SERVICE_SKILL_REQUIREMENTS.get(service_type, [])
        team_size = TIER_CONFIG.get(tier, {}).get("team_size", 3)
        
        # Get list of currently assigned talent IDs
        assigned_talent_ids = await self._get_assigned_talent_ids()
        
        # Query all talent users
        talent_query = self.users.where("role", "==", "talent")
        talent_docs = talent_query.stream()
        
        matched_candidates = []
        available_fallback = []
        
        for doc in talent_docs:
            talent_data = doc.to_dict()
            talent_id = doc.id
            
            # Skip excluded talent
            if talent_id in exclude_ids:
                continue
            
            # Check if talent has passed assessments
            aptitude = talent_data.get("aptitude", {})
            coding = talent_data.get("coding", {})
            
            if not aptitude.get("passed") or not coding.get("passed"):
                continue
            
            # Check if talent is currently assigned to active projects
            is_currently_assigned = talent_id in assigned_talent_ids
            
            # Get talent skills from their profile
            talent_skills = talent_data.get("skills", [])
            
            # Calculate match score
            score, matched_skills = self.calculate_skill_match_score(
                talent_skills, required_skills
            )
            
            candidate_data = {
                "talent_id": talent_id,
                "talent_name": talent_data.get("displayName", talent_data.get("fullName", "Unknown")),
                "talent_email": talent_data.get("email", ""),
                "skills_matched": matched_skills if matched_skills else [s.get("name", "") for s in talent_skills[:3]],
                "match_score": round(score, 2),
                "total_skills": len(talent_skills),
                "aptitude_score": aptitude.get("score", 0),
                "coding_score": coding.get("score", 0),
                "is_available": not is_currently_assigned,
            }
            
            if score > 0:
                # Good skill match
                matched_candidates.append(candidate_data)
            elif not is_currently_assigned:
                # No skill match but available - use as fallback
                candidate_data["match_score"] = 10.0  # Base score for availability
                available_fallback.append(candidate_data)
        
        # Sort matched candidates by score (highest first)
        matched_candidates.sort(key=lambda x: (-x["match_score"], -x["is_available"]))
        
        # Sort fallback by aptitude + coding scores
        available_fallback.sort(
            key=lambda x: (x["aptitude_score"] + x["coding_score"]), 
            reverse=True
        )
        
        # Combine: matched first, then fallback
        all_candidates = matched_candidates + available_fallback
        
        # Return enough candidates (up to 2x team size for selection flexibility)
        return all_candidates[:team_size * 2]

    async def _get_assigned_talent_ids(self) -> set:
        """Get IDs of talent currently assigned to active projects."""
        assigned_ids = set()
        
        # Query active collaborations (not completed)
        collabs = self.collaborations.where("status", "in", ["assigned", "in_progress"]).stream()
        
        for doc in collabs:
            data = doc.to_dict()
            for assignment in data.get("assigned_talent", []):
                if assignment.get("status") in ["pending", "accepted"]:
                    assigned_ids.add(assignment.get("talent_id"))
        
        return assigned_ids

    async def auto_assign_talent(
        self,
        project_id: str,
        client_id: str,
        client_name: str,
        client_email: str,
        service_type: str,
        tier: str
    ) -> ProjectCollaboration:
        """
        Main algorithm: Automatically assign talent to a project.
        Creates a ProjectCollaboration with assigned team.
        """
        team_size = TIER_CONFIG.get(tier, {}).get("team_size", 3)
        duration_weeks = TIER_CONFIG.get(tier, {}).get("duration_weeks", 4)
        
        # Find matching talent
        candidates = await self.find_matching_talent(service_type, tier)
        
        # Select top candidates for the team
        selected_talent = candidates[:team_size]
        
        # Create talent assignments
        assignments = []
        for candidate in selected_talent:
            assignment = TalentAssignment(
                talent_id=candidate["talent_id"],
                talent_name=candidate["talent_name"],
                talent_email=candidate["talent_email"],
                skills_matched=candidate["skills_matched"],
                match_score=candidate["match_score"],
                status=AssignmentStatus.PENDING,
            )
            assignments.append(assignment)
        
        # Calculate deadline
        deadline = datetime.utcnow() + timedelta(weeks=duration_weeks)
        
        # Create the collaboration document
        collaboration = ProjectCollaboration(
            project_id=project_id,
            client_id=client_id,
            client_name=client_name,
            client_email=client_email,
            service_type=service_type,
            tier=tier,
            estimated_duration_days=int(duration_weeks * 7),
            deadline=deadline,
            assigned_talent=assignments,
            status="assigned" if assignments else "matching",
        )
        
        # Save to Firestore
        collab_data = collaboration.model_dump(by_alias=True, exclude={"id"})
        # Convert datetime objects to ISO strings for Firestore
        collab_data["deadline"] = deadline.isoformat()
        collab_data["created_at"] = datetime.utcnow().isoformat()
        
        # Convert nested models
        for i, assignment in enumerate(collab_data["assigned_talent"]):
            assignment["assigned_at"] = assignment["assigned_at"].isoformat() if isinstance(assignment["assigned_at"], datetime) else assignment["assigned_at"]
        
        doc_ref = self.collaborations.add(collab_data)
        collaboration.id = doc_ref[1].id
        
        # Send notifications to assigned talent
        for assignment in assignments:
            await self.notify_talent(
                talent_id=assignment.talent_id,
                project_id=project_id,
                collaboration_id=collaboration.id,
                notification_type="assignment",
                title="New Project Assignment",
                message=f"You've been matched to a {service_type} project! Your skills ({', '.join(assignment.skills_matched)}) are a great fit. Review and accept the assignment."
            )
        
        # Notify the client about their assigned team
        talent_names = [a.talent_name for a in assignments]
        await self.notify_client(
            client_id=client_id,
            project_id=project_id,
            collaboration_id=collaboration.id,
            notification_type="team_assigned",
            title="Your Team Has Been Assigned!",
            message=f"Great news! Your {service_type} project has been assigned to {len(assignments)} verified talent: {', '.join(talent_names)}. They will begin work once they accept the assignment."
        )
        
        return collaboration

    async def notify_talent(
        self,
        talent_id: str,
        project_id: str,
        collaboration_id: str,
        notification_type: str,
        title: str,
        message: str
    ) -> TalentNotification:
        """
        Create and store a notification for a talent member.
        """
        notification = TalentNotification(
            talent_id=talent_id,
            project_id=project_id,
            collaboration_id=collaboration_id,
            type=notification_type,
            title=title,
            message=message,
        )
        
        notif_data = notification.model_dump(by_alias=True, exclude={"id"})
        notif_data["created_at"] = datetime.utcnow().isoformat()
        
        doc_ref = self.notifications.add(notif_data)
        notification.id = doc_ref[1].id
        
        return notification

    async def notify_client(
        self,
        client_id: str,
        project_id: str,
        collaboration_id: str,
        notification_type: str,
        title: str,
        message: str
    ) -> Dict:
        """Create and store a notification for a client."""
        notif_data = {
            "client_id": client_id,
            "project_id": project_id,
            "collaboration_id": collaboration_id,
            "type": notification_type,
            "title": title,
            "message": message,
            "read": False,
            "created_at": datetime.utcnow().isoformat(),
        }
        
        doc_ref = self.client_notifications.add(notif_data)
        notif_data["_id"] = doc_ref[1].id
        
        return notif_data

    async def notify_admin(
        self,
        notification_type: str,
        title: str,
        message: str,
        related_id: str = None,
        related_type: str = None
    ) -> Dict:
        """Create and store a notification for admins."""
        notif_data = {
            "type": notification_type,
            "title": title,
            "message": message,
            "related_id": related_id,
            "related_type": related_type,
            "read": False,
            "created_at": datetime.utcnow().isoformat(),
        }
        
        doc_ref = self.admin_notifications.add(notif_data)
        notif_data["_id"] = doc_ref[1].id
        
        return notif_data

    async def get_client_notifications(
        self, 
        client_id: str, 
        unread_only: bool = False
    ) -> List[Dict]:
        """Get all notifications for a client."""
        query = self.client_notifications.where("client_id", "==", client_id)
        if unread_only:
            query = query.where("read", "==", False)
        
        docs = query.stream()
        
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["_id"] = doc.id
            result.append(data)
        
        # Sort by created_at descending
        result.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return result

    async def get_admin_notifications(self, unread_only: bool = False) -> List[Dict]:
        """Get all admin notifications."""
        query = self.admin_notifications
        if unread_only:
            query = query.where("read", "==", False)
        
        docs = query.stream()
        
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["_id"] = doc.id
            result.append(data)
        
        result.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return result

    async def mark_client_notification_read(self, notification_id: str) -> None:
        """Mark a client notification as read."""
        self.client_notifications.document(notification_id).update({"read": True})

    async def mark_admin_notification_read(self, notification_id: str) -> None:
        """Mark an admin notification as read."""
        self.admin_notifications.document(notification_id).update({"read": True})

    async def get_collaboration(self, collaboration_id: str) -> Optional[ProjectCollaboration]:
        """Get a collaboration by ID."""
        doc = self.collaborations.document(collaboration_id).get()
        if doc.exists:
            data = doc.to_dict()
            data["_id"] = doc.id
            return ProjectCollaboration(**data)
        return None

    async def get_talent_collaborations(self, talent_id: str) -> List[ProjectCollaboration]:
        """Get all collaborations where a talent is assigned."""
        # Query collaborations where talent is in the assigned list
        all_collabs = self.collaborations.stream()
        
        result = []
        for doc in all_collabs:
            data = doc.to_dict()
            data["_id"] = doc.id
            
            # Check if talent is in assigned list
            for assignment in data.get("assigned_talent", []):
                if assignment.get("talent_id") == talent_id:
                    result.append(ProjectCollaboration(**data))
                    break
        
        return result

    async def get_client_collaborations(self, client_id: str) -> List[ProjectCollaboration]:
        """Get all collaborations for a client."""
        query = self.collaborations.where("client_id", "==", client_id)
        docs = query.stream()
        
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["_id"] = doc.id
            result.append(ProjectCollaboration(**data))
        
        return result

    async def update_progress(
        self,
        collaboration_id: str,
        talent_id: str,
        talent_name: str,
        progress_percentage: int,
        message: str
    ) -> ProjectCollaboration:
        """
        Update project progress and notify the client.
        """
        doc_ref = self.collaborations.document(collaboration_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError("Collaboration not found")
        
        data = doc.to_dict()
        
        # Create progress update
        update = ProgressUpdate(
            updated_by=talent_id,
            updated_by_name=talent_name,
            progress_percentage=progress_percentage,
            message=message,
        )
        
        # Add to progress updates list
        progress_updates = data.get("progress_updates", [])
        progress_updates.append(update.model_dump())
        
        # Update overall progress
        doc_ref.update({
            "overall_progress": progress_percentage,
            "progress_updates": progress_updates,
            "status": "completed" if progress_percentage >= 100 else "in_progress",
        })
        
        return await self.get_collaboration(collaboration_id)

    async def send_message(
        self,
        collaboration_id: str,
        sender_id: str,
        sender_name: str,
        sender_role: str,
        message: str,
        is_question: bool = False
    ) -> ChatMessage:
        """
        Send a chat message in the project collaboration.
        """
        doc_ref = self.collaborations.document(collaboration_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError("Collaboration not found")
        
        data = doc.to_dict()
        
        # Create chat message
        chat_msg = ChatMessage(
            sender_id=sender_id,
            sender_name=sender_name,
            sender_role=sender_role,
            message=message,
            is_question=is_question,
        )
        
        # Add to messages list
        messages = data.get("chat_messages", [])
        msg_data = chat_msg.model_dump()
        msg_data["created_at"] = datetime.utcnow().isoformat()
        messages.append(msg_data)
        
        doc_ref.update({"chat_messages": messages})
        
        # If it's a question, also add to clarification questions
        if is_question:
            questions = data.get("clarification_questions", [])
            question = ClarificationQuestion(
                asked_by=sender_id,
                asked_by_name=sender_name,
                question=message,
            )
            q_data = question.model_dump()
            q_data["created_at"] = datetime.utcnow().isoformat()
            questions.append(q_data)
            doc_ref.update({"clarification_questions": questions})
        
        return chat_msg

    async def answer_question(
        self,
        collaboration_id: str,
        question_index: int,
        answer: str
    ) -> ClarificationQuestion:
        """
        Client answers a clarification question.
        """
        doc_ref = self.collaborations.document(collaboration_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError("Collaboration not found")
        
        data = doc.to_dict()
        questions = data.get("clarification_questions", [])
        
        if question_index >= len(questions):
            raise ValueError("Question not found")
        
        # Update the question with answer
        questions[question_index]["answer"] = answer
        questions[question_index]["answered_at"] = datetime.utcnow().isoformat()
        
        doc_ref.update({"clarification_questions": questions})
        
        return ClarificationQuestion(**questions[question_index])

    async def accept_assignment(
        self,
        collaboration_id: str,
        talent_id: str
    ) -> ProjectCollaboration:
        """
        Talent accepts their project assignment.
        """
        doc_ref = self.collaborations.document(collaboration_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError("Collaboration not found")
        
        data = doc.to_dict()
        assignments = data.get("assigned_talent", [])
        
        # Find and update the talent's assignment
        for assignment in assignments:
            if assignment.get("talent_id") == talent_id:
                assignment["status"] = AssignmentStatus.ACCEPTED.value
                assignment["accepted_at"] = datetime.utcnow().isoformat()
                break
        
        # Check if all talent have accepted
        all_accepted = all(
            a.get("status") == AssignmentStatus.ACCEPTED.value 
            for a in assignments
        )
        
        update_data = {"assigned_talent": assignments}
        if all_accepted:
            update_data["status"] = "in_progress"
            update_data["started_at"] = datetime.utcnow().isoformat()
        
        doc_ref.update(update_data)
        
        return await self.get_collaboration(collaboration_id)

    async def get_talent_notifications(
        self, 
        talent_id: str, 
        unread_only: bool = False
    ) -> List[TalentNotification]:
        """
        Get all notifications for a talent.
        """
        query = self.notifications.where("talent_id", "==", talent_id)
        if unread_only:
            query = query.where("read", "==", False)
        
        docs = query.order_by("created_at", direction="DESCENDING").stream()
        
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["_id"] = doc.id
            result.append(TalentNotification(**data))
        
        return result

    async def mark_notification_read(self, notification_id: str) -> None:
        """Mark a notification as read."""
        self.notifications.document(notification_id).update({"read": True})
