import os
import requests
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
load_dotenv(".env")
load_dotenv(".env.bootstrap")


# Load environment variables
FIREBASE_CREDENTIALS = os.getenv("FIREBASE_CREDENTIALS_PATH", "firebase-adminsdk.json")
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")
FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")

# Admin user details
ADMIN_EMAIL = os.getenv("BOOTSTRAP_ADMIN_EMAIL", "Phuti.somahorse@gmail.com")
ADMIN_PASSWORD = os.getenv("BOOTSTRAP_ADMIN_PASSWORD", "MaleNexus")

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred, {"projectId": FIREBASE_PROJECT_ID})

# Step 1: Create user (if not exists)
def create_admin_user(email, password):
    try:
        user = auth.get_user_by_email(email)
        print(f"[+] User already exists: UID={user.uid}")
        return user
    except auth.UserNotFoundError:
        user = auth.create_user(email=email, password=password, email_verified=True)
        print(f"[+] User created: UID={user.uid}")
        return user

# Step 2: Set admin custom claim
def set_admin_claim(user):
    auth.set_custom_user_claims(user.uid, {"role": "admin"})
    print(f"[+] Admin claim set for UID={user.uid}")

# Step 3: Create custom token
def create_custom_token(user):
    token = auth.create_custom_token(user.uid)
    print(f"[+] Custom token created")
    return token.decode()

# Step 4: Exchange custom token for ID token
def exchange_custom_token_for_id_token(custom_token):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={FIREBASE_WEB_API_KEY}"
    payload = {
        "token": custom_token,
        "returnSecureToken": True
    }
    resp = requests.post(url, json=payload)
    resp.raise_for_status()
    data = resp.json()
    print("[+] ID token obtained")
    return data

# Main execution
if __name__ == "__main__":
    user = create_admin_user(ADMIN_EMAIL, ADMIN_PASSWORD)
    set_admin_claim(user)
    custom_token = create_custom_token(user)
    token_data = exchange_custom_token_for_id_token(custom_token)

    print("\n=== BOOTSTRAP COMPLETE ===")
    print("Use the following ID token in Authorization header:")
    print(token_data["idToken"])
    print("\nRefresh token (optional for long-running scripts):")
    print(token_data["refreshToken"])
