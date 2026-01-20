# src/core/dependencies.py

from fastapi import Security, HTTPException, status
from src.core.security import bearer_scheme, verify_firebase_token

def get_current_user(
    credentials=Security(bearer_scheme),
):
    decoded_token = verify_firebase_token(credentials)

    return {
        "uid": decoded_token["uid"],
        "email": decoded_token.get("email"),
        "claims": decoded_token,
    }

def get_admin_user(
    user=Security(get_current_user),
):
    if not user["claims"].get("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return user
