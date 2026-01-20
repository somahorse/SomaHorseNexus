from fastapi import APIRouter, Depends, HTTPException, status
from firebase_admin import auth as firebase_auth
from src.core.security import get_current_user
from src.schemas.auth import (
    RegisterRequest,
    SetRoleRequest,
    ProfileResponse,
    AllowedRole
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register new user",
    responses={
        409: {"description": "Email already registered"},
        400: {"description": "Validation error or invalid role"},
        500: {"description": "Internal server error during registration"}
    }
)
async def register(payload: RegisterRequest):
    """
    Create a new user account

    - Creates Firebase Auth user
    - Sets role and default flags in custom claims
    - Returns profile + custom token for immediate client-side sign-in
    """
    try:
        user = firebase_auth.create_user(
            email=payload.email,
            password=payload.password,
            display_name=payload.display_name or payload.email.split("@")[0],
            email_verified=False,
        )

        # Prepare claims – always include all expected keys
        claims = {
            "role": payload.role,
            "certified": False,           # always present, defaults to False
            "onboarded": False
        }

        firebase_auth.set_custom_user_claims(user.uid, claims)

        custom_token = firebase_auth.create_custom_token(user.uid)

        return ProfileResponse(
            uid=user.uid,
            email=user.email,
            display_name=user.display_name,
            role=payload.role,
            certified=False,
            email_verified=False,
            onboarded=False,
            custom_token=custom_token.decode("utf-8"),
            message="Account created successfully. Please verify your email."
        )

    except firebase_auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=409, detail="Email already registered")
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(ve)}")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )


@router.get(
    "/me",
    response_model=ProfileResponse,
    summary="Get current user's profile",
    responses={
        401: {"description": "Unauthorized – invalid or missing token"},
        500: {"description": "Internal error fetching profile"}
    }
)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """
    Return the current authenticated user's profile data.

    This endpoint is called frequently (e.g. on app load, navigation).
    Returns data from both Firebase Auth record and custom claims.
    """
    try:
        fb_user = firebase_auth.get_user(current_user["uid"])
        claims = current_user  # decoded ID token claims

        return ProfileResponse(
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
            detail=f"Failed to fetch profile: {str(e)}"
        )


@router.post(
    "/set-role",
    response_model=dict,
    summary="Update user's role",
    responses={
        400: {"description": "Invalid role"},
        403: {"description": "Not allowed to set admin role"},
        500: {"description": "Failed to update role"}
    }
)
async def set_role(
    payload: SetRoleRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Update the authenticated user's role.

    For MVP: allowed for self-service.
    In production you may want to restrict this (admin only, first-time only, etc.)
    """
    new_role = payload.role

    # Prevent upgrading to admin via this endpoint
    if new_role == "admin":
        raise HTTPException(
            status_code=403,
            detail="Cannot set admin role through this endpoint"
        )

    try:
        # Merge = keep existing claims (certified, onboarded, ...)
        firebase_auth.set_custom_user_claims(
            current_user["uid"],
            {"role": new_role},
            merge=True
        )

        return {"message": f"Role successfully updated to {new_role}"}

    except firebase_auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update role: {str(e)}"
        )