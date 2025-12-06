from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def init_db():
    # Import models and create tables
    from models import User  # noqa: F401
    db.create_all()
