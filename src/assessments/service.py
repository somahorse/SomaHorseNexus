from typing import List, Optional
from src.database import get_db
from src.models.assessment import ChallengeType, Submission
from src.models.user import SkillTag
from datetime import datetime
import random

class AssessmentService:
    def __init__(self):
        self.db = get_db()
        self.submissions_collection = self.db.collection("submissions")

    async def get_challenges(self) -> List[ChallengeType]:
        """
        Returns the list of specific challenges (V1 Hardcoded).
        """
        return [
            ChallengeType(
                _id="ch_mobile_money_fraud",
                title="Mobile Money Fraud Detection",
                description="Clean a disorganized dataset of 1M transactions and identify 5 key fraud patterns.",
                dataset_url="https://somahorse-public-datasets.s3.amazonaws.com/mobile_money_sample.csv",
                starter_code="import pandas as pd\n\ndef detect_fraud(df):\n    # Your code here\n    pass",
                passing_accuracy=0.85
            ),
             ChallengeType(
                _id="ch_crop_disease",
                title="Crop Disease Classification",
                description="Build a CNN pipeline to classify cassava leaf disease images.",
                dataset_url="https://somahorse-public-datasets.s3.amazonaws.com/cassava_leaf.zip",
                starter_code="import tensorflow as tf\n\ndef build_model():\n    # Your architecture\n    pass",
                passing_accuracy=0.90
            )
        ]

    async def submit_solution(self, submission: Submission) -> Submission:
        """
        Grades the code submission.
        V1: Mock Grading (Randomly approves for Demo purposes).
        """
        # 1. Mock Code Execution
        # In reality, this would send code to a Sandboxed Runner
        mock_accuracy = random.uniform(0.70, 0.99)
        submission.model_accuracy = mock_accuracy
        
        # 2. Check Pass/Fail
        challenge_id = submission.challenge_id
        # Ideally fetch challenge to get passing_threshold, assuming 0.85 for now
        threshold = 0.85 
        submission.passed = mock_accuracy >= threshold
        
        # 3. Generate Feedback & Skills
        if submission.passed:
            submission.feedback = "Generic Success: Great use of Pandas aggregation."
            submission.extracted_skills = [
                SkillTag(name="Python", confidence_score=0.95, verified=True),
                SkillTag(name="Data Cleaning", confidence_score=0.88, verified=True)
            ]
        else:
            submission.feedback = "Generic Failure: Accuracy too low. Try handling missing values better."
        
        submission.submitted_at = datetime.utcnow()

        # 4. Save
        _, doc_ref = self.submissions_collection.add(submission.model_dump(by_alias=True))
        submission.id = doc_ref.id
        
        return submission
