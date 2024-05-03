import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

POSTGRES_HOST = os.environ["POSTGRES_HOST"]
POSTGRES_PORT = os.environ["POSTGRES_PORT"]
POSTGRES_USERNAME = os.environ["POSTGRES_USERNAME"]
POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]
POSTGRES_DBNAME = os.environ["POSTGRES_DBNAME"]

CONNECTION_URI = f"postgresql://{POSTGRES_USERNAME}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DBNAME}"


class Connection:
    """
    Manages the connection to PostgreSQL.
    The singleton and most of its fields are shared across threads/requests. self.session is unique per thread.
    Scoped session allows to create one session per request so its lifespan starts and ends with each request.
    See https://docs.sqlalchemy.org/en/20/orm/contextual.html#using-custom-created-scopes
    """

    def __init__(self) -> None:
        self.engine = create_engine(
            CONNECTION_URI, echo=False, pool_recycle=3600, pool_size=10, max_overflow=20
        )
        self.Session = sessionmaker(bind=self.engine, expire_on_commit=False)
        self.session = self.Session()

    def refresh_session(self):
        self.session = self.Session()

    def close_session(self):
        self.session.close()
