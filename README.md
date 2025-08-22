# Store Ratings Platform

A full-stack web application for rating stores, with role-based dashboards for administrators, users, and store owners.

---

## Tech Stack

- **Backend:** Express.js + Sequelize + MySQL
- **Frontend:** React.js (Vite) + Bootstrap
- **API Docs:** Swagger

---

## Where to Run Each Setup Command

This project has two main folders: `backend` and `frontend`.

- **Backend setup commands** (like installing dependencies, migrations, seeding, starting the server)  
  **must be run inside the `backend` folder**.

- **Frontend setup commands** (like installing dependencies and starting the client)  
  **must be run inside the `frontend` folder**.

---

## Step-by-Step Backend Setup

1. **Open your terminal/command prompt.**

2. **Navigate to your project’s backend folder:**
   ```bash
   cd path/to/your/store-rating-platform/backend
   ```
   (Replace `path/to/your` with the actual path on your computer.)

3. **Now run each backend setup command from _inside_ the `backend` folder, for example:**
   ```bash
   # Install dependencies
   npm install

   # Copy and edit env file
   cp .env.example .env
   # Then open .env in a text editor and fill in your DB credentials and JWT secret

   # Create the database in MySQL (do this in a MySQL client, not in terminal)
   # Example, in MySQL:
   # CREATE DATABASE store_ratings_db;

   # Run migrations (in terminal, still in backend/)
   npx sequelize-cli db:migrate

   # Seed the database (in terminal)
   npx sequelize-cli db:seed:all

   # Start the backend server
   npm run dev
   ```

---

## Step-by-Step Frontend Setup

1. **Open a new terminal window/tab.**

2. **Navigate to your project’s frontend folder:**
   ```bash
   cd path/to/your/store-rating-platform/frontend
   ```
   (Replace `path/to/your` with the actual path on your computer.)

3. **Now run each frontend setup command from _inside_ the `frontend` folder, for example:**
   ```bash
   # Install dependencies
   npm install

   # Copy and edit env file
   cp .env.example .env
   # Open .env and set VITE_API_URL to http://localhost:5000/api

   # Start the frontend
   npm run dev
   ```

---

**Always make sure you are in the correct folder before running the commands!**

---

## Quick Start — Local Setup

### 1. Prerequisites

- Node.js (>=18)
- MySQL (>=8)
- npm or pnpm

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env to match your MySQL credentials and set a JWT secret

# Create database in MySQL
# Login to mysql and run:
# CREATE DATABASE store_ratings_db;

# Run migrations
npx sequelize-cli db:migrate

# Seed the database (creates default admin)
npx sequelize-cli db:seed:all

# Start the backend server
npm run dev
```

- Backend API runs at http://localhost:5000/api
- Swagger docs: http://localhost:5000/api-docs

#### Default Admin Credentials

- **Email:** admin@admin.com
- **Password:** Admin@1234

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (set correct API URL)
cp .env.example .env
# VITE_API_URL should be http://localhost:5000/api

# Start the frontend
npm run dev
```

- Frontend runs at http://localhost:5173

---

## Usage

- **Admin:** Log in using admin credentials to create/manage users and stores.
- **Normal User:** Register using the registration page. Rate stores, update your ratings.
- **Store Owner:** Admin can create owners and assign stores to them. Owners see users/ratings for their store.
- **All roles:** Can update password and log out from their dashboard.

---

## Features

- JWT authentication & role-based access
- Admin dashboard: stats, manage users/stores, filtering/sorting
- Normal user: register/login, view/search/rate stores
- Store owner: see ratings and users for their store
- Form validations enforced (backend)
- Minimal, responsive UI with Bootstrap
- API documentation via Swagger

---

## Troubleshooting

- **DB errors:** Check `.env` and ensure MySQL is running and database was created.
- **Migrations/seed errors:** Run migrate before seed.
- **Frontend cannot connect:** Check `VITE_API_URL` in `/frontend/.env`.
- **CORS errors:** Should not happen (CORS enabled in backend).

---

## FAQ

- **How to add more admins/owners?**  
  Log in as admin and use the dashboard to add new users with chosen role.
- **How to assign a store to an owner?**  
  Add/edit a store with the owner’s user ID.

---

## License

MIT

---

**If you have further questions or want to customize the design/UI/UX, just ask!**