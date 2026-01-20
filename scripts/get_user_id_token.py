# get_user_id_token.py
# Run this script to get an ID token for a specific user
# Requirements: pip install firebase-admin firebase

import os
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
load_dotenv(".env")
load_dotenv(".env.bootstrap")


FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")

# === CONFIG ===
# Use the same service account you already use in main.py
cred = credentials.Certificate("firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

# === CHANGE THESE VALUES ===
USER_EMAIL = "Vern@gmail.com"           # ← user you want to get token for
USER_PASSWORD = "Vern123"         # ← their password

def get_id_token(email: str, password: str) -> str:
    try:
        # Sign in as the user using REST API (simplest way from backend)
        # Note: This uses the Identity Toolkit API (same as client SDK)
        import requests

        api_key = FIREBASE_WEB_API_KEY  # ← from Firebase Console → Project Settings → Web API Key

        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}"
        
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }

        response = requests.post(url, json=payload)
        response.raise_for_status()

        data = response.json()
        id_token = data["idToken"]

        print("\n" + "="*70)
        print("SUCCESS! Here's the ID token:")
        print(id_token)
        print("="*70 + "\n")
        print("Use it in Swagger like this:")
        print(f"Bearer {id_token[:20]}... (full token above)")
        print("\nThis token is valid for ~1 hour.")

        return id_token

    except requests.exceptions.HTTPError as e:
        print("Error signing in:")
        print(e.response.text)
    except Exception as e:
        print("Unexpected error:", str(e))
    return None


if __name__ == "__main__":
    get_id_token(USER_EMAIL, USER_PASSWORD)