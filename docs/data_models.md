# Data Models & Schema

This document explains the core data structures used in the backend.

## 1. Project (`src.models.project`)
Represents a job requested by a Client.
- **Service Catalog**: We productize AI. A project isn't just "Do AI", it's a specific product (e.g., "Fraud Detection") at a specific **Tier** (Basic, Standard, Premium).
- **Status Lifecycle**: `Draft` -> `Open` -> `Matched` -> `In Progress` -> `Completed`.
- **ROI**: Every project carries a `ROIForecast` object, showing the client why they should buy.

## 2. Assessment (`src.models.assessment`)
Represents the "Talent Gate".
- **Challenge**: A predefined problem (e.g., "Clean this dataset"). Usage: `GET /challenges`.
- **Submission**: The developer's attempt. Logic:
    1.  Dev submits code.
    2.  `AssessmentService` runs the code.
    3.  If `accuracy > passing_accuracy`: Mark `passed=True` and generate `extracted_skills`.

## 3. User (`src.models.user`)
- **Single Collection**: We store all users in `users` collection.
- **Roles**: `developer`, `client`, `admin`.
- **Polymorphism**: 
    - If `role == developer`: The `developer_profile` field is populated (Skills, Earnings).
    - If `role == client`: The `client_profile` field is populated (Company Info).
