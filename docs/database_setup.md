# Database Setup & Architecture Guide

## Overview
We are using **Google Cloud Firestore** (NoSQL) as the primary database for Somahorse Nexus. 
This document explains how the connection is established and how we structure our data models.

## 1. Connection Logic (`src/database.py`)
Instead of initializing Firebase in the global scope of `main.py`, we move it to a dedicated module. This allows:
- Better error handling.
- Lazy initialization.
- Type-safe client access via the `get_db()` function.

### How it works
1.  **Credentials**: We use the `firebase-admin` SDK. It looks for credentials in this order:
    - `FIREBASE_CREDENTIALS_PATH` (Local JSON file).
    - `GOOGLE_APPLICATION_CREDENTIALS` (Standard Env Var).
    - Default Cloud Identity (if running on Google Cloud).
2.  **Firestore Client**: We expose a `db` object which is an instance of `firestore.client()`.

## 2. Configuration (`src/core/config.py`)
We use `pydantic-settings` to manage environment variables. 
The `.env` file must contain:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CREDENTIALS_PATH=./firebase-adminsdk.json
```

## 3. Usage
To talk to the database in any API route, simply import the db client:
```python
from src.database import get_db

def create_user(data):
    db = get_db()
    db.collection("users").add(data)
```
