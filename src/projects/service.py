from typing import List, Optional
from src.database import get_db
from src.models.project import Project, ServiceCatalogItem, ProjectTier, ProjectStatus, ROIForecast
from datetime import datetime

class ProjectService:
    def __init__(self):
        self.db = get_db()
        self.collection = self.db.collection("projects")

    async def get_catalog(self) -> List[ServiceCatalogItem]:
        """
        Returns the hardcoded Service Catalog for V1.
        In V2, this could come from the DB.
        """
        return [
            ServiceCatalogItem(
                _id="sc_fraud_detection",
                name="AI Fraud Detection",
                description="Real-time anomaly detection for mobile money transactions.",
                base_price=5000.00,
                tiers={
                    ProjectTier.BASIC: {"delivery": "2 weeks", "includes": "API Endpoint"},
                    ProjectTier.STANDARD: {"delivery": "4 weeks", "includes": "API + Dashboard"},
                    ProjectTier.PREMIUM: {"delivery": "6 weeks", "includes": "Full MLOps Pipeline"}
                }
            ),
            ServiceCatalogItem(
                _id="sc_credit_scoring",
                name="Credit Scoring Model",
                description="Predict loan defaults using alternative data sources.",
                base_price=7000.00,
                tiers={
                    ProjectTier.BASIC: {"delivery": "3 weeks", "includes": "Model Weights"},
                    ProjectTier.STANDARD: {"delivery": "5 weeks", "includes": "Scoring API"},
                    ProjectTier.PREMIUM: {"delivery": "8 weeks", "includes": "Explainable AI Dashboard"}
                }
            )
        ]

    async def create_project(self, project_data: Project) -> Project:
        """
        Creates a new project in Firestore from a Client request.
        Auto-calculates the initial ROI forecast.
        """
        # 1. Generate ROI Forecast (Mock Intelligence)
        # In V2, this calls the ForecastingService
        project_data.roi_forecast = ROIForecast(
            estimated_savings_percentage=45.0, # Mock value based on spec
            estimated_roi_multiplier=3.2,
            confidence_score=0.85
        )
        
        # 2. Set Status
        project_data.status = ProjectStatus.OPEN
        project_data.created_at = datetime.utcnow()
        
        # 3. Save to DB
        _, doc_ref = self.collection.add(project_data.model_dump(by_alias=True))
        project_data.id = doc_ref.id
        
        return project_data

    async def get_project(self, project_id: str) -> Optional[Project]:
        doc = self.collection.document(project_id).get()
        if doc.exists:
            return Project(**doc.to_dict(), _id=doc.id)
        return None
