# SchoolFee Now - FinTech Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed for secure fee payments, wallet management, and expense tracking.

## Features
- **Authentication:** JWT-based secure login, role-based access control (Parent & Admin).
- **Wallet System:** Atomic deposit, withdrawal, and user-to-user transfer logic strictly enforced on the backend.
- **Budgeting & Expenses:** Track expenses and set budget limits with automatic threshold warnings.
- **Suspicious Monitoring:** Backend flags anomalous transactions based on 5 strict financial rules.
- **Admin Dashboard:** Centralized management for users, wallets, transaction monitoring, and fee categories.

## Project Structure
- `/backend`: Node.js/Express REST API.
- `/frontend`: React/Vite responsive single-page application.
- `start.bat`: One-click script to run both servers locally.

## Setup Instructions

1. **Prerequisites:** Make sure you have Node.js and MongoDB installed locally.
2. **Install Dependencies:**
   - In terminal 1, navigate to `backend/` and run `npm install`.
   - In terminal 2, navigate to `frontend/` and run `npm install`.
3. **Environment Variables:**
   - Go to `backend/.env` and configure your `MONGO_URI` (defaults to local DB `mongodb://localhost:27017/schoolfee-now`).
4. **Start Application:**
   - Run the `start.bat` file in the root directory, or manually run `nodemon server.js` (backend) and `npm run dev` (frontend).

## Deployment Information
- **Backend:** Ready for deployment on Heroku/Render. Set `NODE_ENV=production` and add environment variables to the dashboard.
- **Frontend:** Ready for deployment on Vercel/Netlify. Ensure `services/api.js` points to your deployed backend URL.
- **Database:** Migrate from localhost to MongoDB Atlas for cloud persistence.
