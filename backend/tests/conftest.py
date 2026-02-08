import pytest
from httpx import AsyncClient
from src.main import app
from src.auth.middleware import get_current_user_id

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c
