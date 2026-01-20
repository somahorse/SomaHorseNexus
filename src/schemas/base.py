# src/schemas/base.py
from pydantic import BaseModel, ConfigDict

class BaseSchema(BaseModel):
    """Base class for all schemas with common config"""
    model_config = ConfigDict(from_attributes=True)  # good for ORM → Pydantic conversion