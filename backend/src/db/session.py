from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from src.config import settings

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import make_url
from sqlmodel import SQLModel
from src.config import settings
import ssl

# Robustly parse and clean the database URL
url = make_url(settings.DATABASE_URL)

# Force asyncpg driver
url = url.set(drivername="postgresql+asyncpg")

# Remove query parameters incompatible with asyncpg
if url.query:
    query_dict = dict(url.query)
    # Remove standard sync-driver params
    for key in ["sslmode", "channel_binding", "options", "target_session_attrs"]:
        query_dict.pop(key, None)
    url = url._replace(query=query_dict)

# Configure SSL context for Neon/Cloud Postgres
connect_args = {}
# Assuming 'require' behavior is desired for cloud DBs
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE
connect_args["ssl"] = ssl_context

engine = create_async_engine(url, echo=True, future=True, connect_args=connect_args)

async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
