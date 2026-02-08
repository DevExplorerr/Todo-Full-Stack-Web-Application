import pytest
from src.main import app
from src.auth.middleware import get_current_user_id

# Mock Auth Overrides
async def mock_get_user_a():
    return "user_a"

async def mock_get_user_b():
    return "user_b"

@pytest.mark.anyio
async def test_data_isolation(client):
    # 1. Create Task as User A
    app.dependency_overrides[get_current_user_id] = mock_get_user_a
    response = await client.post("/api/v1/tasks/", json={"title": "User A Task"})
    assert response.status_code == 201
    task_id = response.json()["id"]

    # 2. Try to Read Task as User B
    app.dependency_overrides[get_current_user_id] = mock_get_user_b
    response = await client.get(f"/api/v1/tasks/{task_id}")
    
    # Expect 404 (Not Found) because logic filters by user_id
    assert response.status_code == 404

    # 3. Try to List Tasks as User B
    response = await client.get("/api/v1/tasks/")
    assert response.status_code == 200
    tasks = response.json()
    # User B should see 0 tasks (or at least not User A's task)
    assert len([t for t in tasks if t["id"] == task_id]) == 0

    # Cleanup overrides
    app.dependency_overrides = {}
