# src/schemas/auth.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

AllowedRole = Literal["developer", "client", "admin"]


class RegisterRequest(BaseModel):
    """
    Request body for user registration
    """
    email: EmailStr
    password: str = Field(..., min_length=8, description="Minimum 8 characters")
    display_name: Optional[str] = Field(None, max_length=100)
    role: AllowedRole = Field(..., description="User role (developer, client, admin)")


class SetRoleRequest(BaseModel):
    """
    Request to change user's role
    """
    role: AllowedRole


class ProfileResponse(BaseModel):
    """
    Standardized response for user profile information
    """
    uid: str
    email: str
    display_name: Optional[str] = None
    role: Optional[str] = None
    certified: bool = False
    email_verified: bool = False
    onboarded: bool = False

    custom_token: Optional[str] = Field(
        None, description="Only returned during registration"
    )
    message: Optional[str] = Field(
        None, description="Informational message (registration only)"
    )

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "uid": "abc123xyz...",
                "email": "user@example.com",
                "display_name": "Phuti Dev",
                "role": "developer",
                "certified": False,
                "email_verified": False,
                "onboarded": False
            }
        }