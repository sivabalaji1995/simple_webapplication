# User Details Web Application

React (Vite + Tailwind) frontend with Python (Flask + SQLAlchemy) backend.
Stores user details (name, age, sex, phone) in PostgreSQL or MySQL.

## Quick Start

### Backend (Python)
1. Create a virtual env and install deps:
   - Windows PowerShell:
     ```powershell
     python -m venv .venv
     .venv\\Scripts\\Activate.ps1
     pip install -r backend/requirements.txt
     ```
2. Set `DATABASE_URL` in environment (or copy `backend/.env.example` to `.env` and export manually):
   - PostgreSQL: `postgresql+psycopg2://user:pass@localhost:5432/dbname`
   - MySQL: `mysql+pymysql://user:pass@localhost:3306/dbname`
   - If not set, the app uses a local SQLite file `dev.db` for quick testing.
3. Run the server:
   ```powershell
   set DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/dbname  # or mysql+pymysql://...
   python backend/app.py
   ```
   Server runs at http://localhost:5000

### Database Notes
- Ensure the DB exists and credentials are correct.
- Tables are auto-created via `db.create_all()` on startup.

### Frontend (React + Vite + Tailwind)
1. Install Node dependencies:
   ```powershell
   cd frontend
   npm install
   ```
2. Start dev server:
   ```powershell
   npm run dev
   ```
   App runs at http://localhost:5173 and proxies `/api` to http://localhost:5000.

## API
- `GET /api/users` → List users
- `POST /api/users` → Create user
  - Body: `{ name: string, age?: number, sex: 'Male'|'Female'|'Other', phone: string }`

## Customize
- Frontend styles in `frontend/src/styles.css` and Tailwind config.
- Backend models in `backend/models.py`.


```

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    sex ENUM('male', 'female', 'other') NOT NULL,
    phone VARCHAR(15) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
