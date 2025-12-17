from flask import Flask, request, jsonify
from flask_cors import CORS
from db import db, init_db
from models import User
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///dev.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Allow local dev frontend
    CORS(app, resources={r"/api/*": {"origins": ["http://4.157.201.62:5173"]}})
    print("Database URL:", app.config["SQLALCHEMY_DATABASE_URI"])
    # with app.app_context():
    #     result = db.engine.execute("SELECT DATABASE();")
    #     print("Connected to database:", result.fetchone()[0])
    db.init_app(app)

    with app.app_context():
        init_db()

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"})

    @app.route("/api/users", methods=["GET"])
    def list_users():
        users = User.query.order_by(User.id.desc()).all()
        return jsonify([u.to_dict() for u in users])

    @app.route("/api/users", methods=["POST"])
    def create_user():
        data = request.get_json() or {}
        name = (data.get("name") or "").strip()
        age = data.get("age")
        sex = (data.get("sex") or "").strip()
        phone = (data.get("phone") or "").strip()

        errors = []
        if not name:
            errors.append("name is required")
        try:
            if age is not None and age != "":
                age = int(age)
                if age < 0:
                    errors.append("age must be non-negative")
            else:
                age = None
        except Exception:
            errors.append("age must be an integer")
        if sex not in ["Male", "Female", "Other"]:
            errors.append("sex must be one of 'Male','Female','Other'")
        if not phone:
            errors.append("phone is required")

        if errors:
            return jsonify({"errors": errors}), 400

        user = User(name=name, age=age, sex=sex, phone=phone)
        print("Adding user:", user)

        db.session.add(user)
        db.session.commit()
        print("user added ")

        return jsonify(user.to_dict()), 201

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
