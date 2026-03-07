# Cooperative & Investment Management System

This repository now contains a full-stack starter for a **Cooperative and Investment Management System**.

## Structure

- `frontend/` — React + Tailwind admin app
- `backend/` — Express + MongoDB API with JWT authentication

## Backend features

- Admin login with JWT auth (`/api/auth/login`)
- Protected routes for dashboard, members, finance modules, reports
- MongoDB models for Members, Savings, Loans, Shares, and Fees
- Seeded admin user from env values

## Frontend features

- Mobile responsive login page
- Dashboard stat cards
- Collapsible sidebar with mobile menu
- Members module with add/search/filter/delete
- Savings, Loans, Shares, Fees module pages
- Reports chart (Recharts)
- Placeholder member profile and settings pages

## Quick start

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in frontend environment if backend is not at `http://localhost:5000/api`.
