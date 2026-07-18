# LevelUp by NG — Placement Dashboard

A compact placement dashboard with separate Admin and Student portals for campus recruitment workflows.
---

## Deployment

- Backend: https://levelupbyngbackend.onrender.com
- Health check: https://levelupbyngbackend.onrender.com/api/health
- Frontend: https://levelupbyng.onrender.com

## Project

Compact placement dashboard with Admin and Student roles: Admins create and manage jobs (including eligibility filters, selected students/campuses, deadlines, and application statuses). Students browse jobs, apply, and track statuses (applied, shortlisted, selected, rejected, deadline-over).

## Quick credentials

- Admin: `admin@example.com` / `admin123`
- Student: `student@example.com` / `student123`

These are created by the backend seed script (`backend/scripts/seedDatabase.js`).

## Folder structure

```
levelup/
├─ backend/
│  ├─ server.js
│  ├─ config/
│  │  └─ database.js
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ scripts/
│  │  └─ seedDatabase.js
│  └─ package.json
├─ frontend/
│  ├─ index.html
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ components/
│  │  ├─ context/
│  │  └─ utils/
│  └─ package.json
└─ README.md
```

## Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT
- Frontend: React (Vite), Tailwind CSS, lucide-react

## Run locally (short)

Backend:
```
cd backend
npm install
npm run seed   # optional: creates demo accounts & jobs
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```

Health check (deployed): `https://levelupbyngbackend.onrender.com/api/health`

---