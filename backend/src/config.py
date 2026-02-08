from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # These have defaults, so they will always exist
    PROJECT_NAME: str = "Todo App"
    PROJECT_VERSION: str = "1.0.0"
    
    # These fetch from .env, but have defaults for safety
    SECRET_KEY: str = "super-secret-key"
    BETTER_AUTH_SECRET: str = "super-secret-key" # Mirror for middleware
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # This is critical. If .env is missing, it crashes.
    # We add a default just to let the app start (it will fail later if DB is wrong)
    DATABASE_URL: str = "postgresql://user:pass@localhost/db" 

    class Config:
        env_file = ".env"
        extra = "ignore" # This prevents crashing if .env has extra keys

settings = Settings()