from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    ENV: str = "dev"

    FIREBASE_PROJECT_ID: str
    FIREBASE_CREDENTIALS_PATH: str
    FIREBASE_WEB_API_KEY: str

    BOOTSTRAP_ADMIN_EMAIL: str | None = None
    BOOTSTRAP_ADMIN_PASSWORD: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"  # <-- critical
    )

@lru_cache
def get_settings() -> Settings:
    return Settings()
