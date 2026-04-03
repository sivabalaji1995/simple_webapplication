from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def init_db():
    # Import models and create tables
    from models import User  # noqa: F401
    try:
       db.create_all()
    except Exception as e:
        print("Error creating tables:", e)
