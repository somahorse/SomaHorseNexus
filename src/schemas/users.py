# src/schemas/users.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class PublicUserProfile(BaseModel):
    """
    Publicly visible profile (limited fields)
    Safe to return to any authenticated user
    """
    uid: str
    display_name: Optional[str] = None
    role: Optional[str] = None
    certified: bool = False

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "uid": "abc123xyz...",
                "display_name": "Phuti Dev",
                "role": "developer",
                "certified": False
            }
        }


class FullUserProfile(PublicUserProfile):
    """
    Detailed profile – used for current user (/users/me)
    """
    email: EmailStr
    email_verified: bool = False
    onboarded: bool = False
    # Add more personal fields later when stored in Firestore
    # e.g. bio: Optional[str] = None
    # skills: Optional[list[str]] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "uid": "abc123xyz...",
                "email": "phuti@example.com",
                "display_name": "Phuti Dev",
                "role": "developer",
                "certified": False,
                "email_verified": False,
                "onboarded": False
            }
        }


class UserUpdateRequest(BaseModel):
    """
    Fields allowed for self-update via PATCH /users/me
    """
    display_name: Optional[str] = Field(None, max_length=100)
    # Add more fields when you implement Firestore storage
    # bio: Optional[str] = None
    # skills: Optional[list[str]] = None
    # portfolio_links: Optional[list[str]] = None