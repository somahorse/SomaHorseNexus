
import firebase_admin
from firebase_admin import credentials, firestore
from src.core.config import get_settings
import logging

# Configure logger
logger = logging.getLogger(__name__)
settings = get_settings()

_db = None

def initialize_firebase():
    """
    Initializes the Firebase Admin SDK and Firestore Client.
    Idempotent: safe to call multiple times.
    """
    global _db
    
    # Check if already initialized to avoid "Main App already exists" error
    if firebase_admin._apps:
        _db = firestore.client()
        return _db

    try:
        if settings.FIREBASE_CREDENTIALS_PATH:
            # Use local JSON file
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            logger.info("Firebase initialized with Service Account JSON.")
        else:
            # Use Default Application Credentials (Cloud/Env based)
            firebase_admin.initialize_app()
            logger.info("Firebase initialized with Default Credentials.")
        
        _db = firestore.client()
        return _db
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {e}")
        raise e

def get_db():
    """
    Returns the Firestore Client instance.
    Initializes if not yet ready.
    """
    global _db
    if _db is None:
        initialize_firebase()
    return _db
