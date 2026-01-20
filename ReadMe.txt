### Prerequisites
- Python 3.13 (or compatible version)
- Git (optional, for cloning the repo)
- A code editor (VS Code recommended)


Activate Vertual Environment
.\.venv\Scripts\Activate.ps1

# Install everything
pip install -r requirements.txt

# For development (with editable mode + dev tools)
pip install -e .[dev]   # If you have pyproject.toml/setup.py
# or just:
pip install -r requirements.txt pytest pytest-asyncio httpx


Launch Swagger
python -m uvicorn main:app --reload
or just
uvicorn main:app --reload


