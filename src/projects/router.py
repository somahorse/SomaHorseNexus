from fastapi import APIRouter, HTTPException, Depends
from typing import List
from src.models.project import Project, ServiceCatalogItem
from src.projects.service import ProjectService

router = APIRouter(tags=["Projects"], prefix="/projects")

# Dependency Injection for Service
def get_service():
    return ProjectService()

@router.get("/catalog", response_model=List[ServiceCatalogItem])
async def get_service_catalog(service: ProjectService = Depends(get_service)):
    """
    Get the list of available AI solutions (Fraud Detection, Credit Scoring).
    """
    return await service.get_catalog()

@router.post("/", response_model=Project)
async def create_project(project: Project, service: ProjectService = Depends(get_service)):
    """
    Client submits a new project request.
    Returns the created project with ROI forecast.
    """
    return await service.create_project(project)

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str, service: ProjectService = Depends(get_service)):
    project = await service.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project