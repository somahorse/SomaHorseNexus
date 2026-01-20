import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

auth.set_custom_user_claims(
    uid="D9ya6JH3zjgKjwWVow6HXQMMA3K3",
    custom_claims={"role": "admin"}
)

print("Admin claim applied")
