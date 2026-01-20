import os
from fastapi import FastAPI
from firebase_admin import credentials, initialize_app

# ── Initialize Firebase Admin SDK ─────────────────────────────────────────────
from src.database import initialize_firebase

# Initialize Firebase (Best practice: do this on startup)
initialize_firebase()

# ── FastAPI App ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Somahorse Backend API",
    version="1.0.0",
    docs_url="/docs",
)

# Versioned base path
API_PREFIX = "/api/v1"

# Import and include routers
from src.auth.router import router as auth_router
from src.users.router import router as users_router
from src.projects.router import router as projects_router
from src.admin.router import router as admin_router
from src.assessments.router import router as assessments_router
# Uncomment when ready:
# from src.developers.router import router as developers_router
# from src.tools.router import router as tools_router

app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(users_router, prefix=API_PREFIX)
app.include_router(projects_router, prefix=API_PREFIX)
app.include_router(admin_router, prefix=API_PREFIX)
app.include_router(assessments_router, prefix=API_PREFIX)

# Uncomment when you implement these modules
# app.include_router(developers_router, prefix=API_PREFIX)
# app.include_router(tools_router, prefix=API_PREFIX)


@app.get("/")
async def root():
    return {
        "message": "Somahorse Backend API 🐎",
        "docs": "/docs",
        "status": "running",
        "firebase": "initialized"
    }