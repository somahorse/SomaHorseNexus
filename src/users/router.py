from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import List
from firebase_admin import auth as firebase_auth
from src.core.security import get_current_user, get_current_admin_user
from src.schemas.users import PublicUserProfile, FullUserProfile

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=FullUserProfile,
    summary="Get current user's detailed profile",
    responses={
        401: {"description": "Unauthorized"},
        404: {"description": "User not found"},
        500: {"description": "Internal server error"}
    }
)
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """
    Returns detailed profile of the currently authenticated user.
    Mirrors /auth/me but lives under /users for domain consistency.
    """
    try:
        fb_user = firebase_auth.get_user(current_user["uid"])
        claims = current_user

        return FullUserProfile(
            uid=fb_user.uid,
            email=fb_user.email,
            display_name=fb_user.display_name,
            role=claims.get("role"),
            certified=bool(claims.get("certified", False)),
            email_verified=fb_user.email_verified,
            onboarded=bool(claims.get("onboarded", False)),
        )

    except firebase_auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch user profile: {str(e)}"
        )


@router.patch(
    "/me",
    response_model=dict,
    summary="Update current user's profile",
    responses={
        400: {"description": "Invalid update data"},
        500: {"description": "Update failed"}
    }
)
async def update_current_user_profile(
    # payload: UserUpdateRequest,  # Uncomment when ready to accept body
    current_user: dict = Depends(get_current_user)
):
    """
    Update own profile (currently placeholder).
    In future: accept display_name, bio, skills, etc. and store in Firestore.
    """
    # For MVP: minimal update (e.g. only display_name via Firebase Auth)
    # Real rich profile fields should go to Firestore collection "users"
    return {
        "message": "Profile update endpoint – implement Firestore storage for full functionality"
    }


@router.get(
    "/{id}",
    response_model=PublicUserProfile,
    summary="Get public profile of any user"
)
async def get_public_user_profile(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Public profile view – limited fields.
    """
    try:
        user = firebase_auth.get_user(id)
        claims = user.custom_claims or {}

        return PublicUserProfile(
            uid=user.uid,
            display_name=user.display_name,
            role=claims.get("role"),
            certified=bool(claims.get("certified", False)),
        )

    except firebase_auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch public profile: {str(e)}"
        )


@router.get(
    "/developers",
    response_model=List[PublicUserProfile],
    summary="List certified developers"
)
async def list_certified_developers(
    limit: int = Query(20, ge=5, le=100, description="Results per page"),
    current_user: dict = Depends(get_current_user)
):
    """
    Returns list of certified developers (public endpoint).
    MVP version – uses Firebase list_users() with simple filtering.
    """
    try:
        developers = []
        page = firebase_auth.list_users(max_results=limit)

        for user_record in page.users:
            claims = user_record.custom_claims or {}
            if (
                claims.get("role") == "developer"
                and bool(claims.get("certified", False))
            ):
                developers.append(
                    PublicUserProfile(
                        uid=user_record.uid,
                        display_name=user_record.display_name,
                        role="developer",
                        certified=True
                    )
                )

        return developers

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to list developers: {str(e)}"
        )


@router.post(
    "/{id}/certify",
    status_code=status.HTTP_200_OK,
    summary="Certify a developer (admin only)"
)
async def certify_developer(
    id: str,
    admin_user = Depends(get_current_admin_user)
):
    """
    Admin-only endpoint to mark a developer as certified.
    """
    try:
        firebase_auth.set_custom_user_claims(
            id,
            {"certified": True},
            merge=True
        )
        return {"message": f"Developer {id} certified successfully"}

    except firebase_auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Certification failed: {str(e)}"
        )