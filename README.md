# SchoolFee Now - FinTech Management System

A comprehensive, full-stack MERN (MongoDB, Express, React, Node.js) web application designed to handle secure fee payments, digital wallet management, and expense tracking. Built strictly to satisfy advanced university FinTech and Security guidelines.

## 🚀 Key Features

### 🔐 Security & Authentication
- **Dual-Role Access:** Segregated `parent` (user) and `school_admin` access using strict JWT-based middleware.
- **Backend Enforced Security:** Passwords hashed via `bcryptjs`. Role modification and fake balances strictly blocked at the backend controller level.
- **Attack Mitigation:** Global rate-limiting (`express-rate-limit`), HTTP header security (`helmet`), and graceful generic error handling (prevents stack trace leaks).

### 💳 Digital Wallet & Transactions
- **Atomic Operations:** Deposits, withdrawals, and user-to-user transfers. 
- **Data Integrity:** The backend completely ignores any frontend-calculated balances, mathematically calculating and persisting balances natively using `Promise.all` to prevent partial updates.
- **Suspicious Monitoring:** The backend automatically evaluates all transactions against 5 strict rules (High Value, Blocked User Attempts, Self-Transfers, etc.) and permanently flags anomalies in the database.

### 🎓 BNPL Education Ecosystem (Core Proposal)
- **Student Linking:** Parents can securely bind internal School Student IDs (`STU-12345`) directly to their user profiles.
- **Dynamic Fee Structures:** Pulls live tuition fees directly from the linked educational institution's database.
- **Smart Installment Engine:** Applies 5%, 10%, or 15% markups and programmatically spawns 12 individual `Installment` records with mapped due dates based on the parent's chosen repayment plan.

### 📊 Analytics & Reporting
- **Dynamic Charts:** Integration with `recharts` to render beautiful, live SVG data visualizations of Wallet Cashflow and Expense breakdown.
- **Budget Alerts:** Tracks user-defined monthly and category budget limits, automatically dispatching `nearLimit` and `exceeded` notifications.
- **Admin Oversight:** Dedicated dashboards for admins to review system-wide balances, transaction volumes, and block/unblock malicious actors.

---

## 🛠️ Technology Stack

- **Frontend:** React (Vite), React Router DOM, Axios, Recharts, Custom CSS (Flexbox, Mobile-First).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ODM).
- **Security:** JWT, Bcryptjs, Helmet, CORS, Express-Rate-Limit.

---

## 📂 Project Structure

```text
/backend
├── /config         # Database connection logic
├── /controllers    # Core business logic (Auth, Wallet, Expenses, Admin)
├── /middlewares    # Auth validation, Error handlers, Rate limiters
├── /models         # 11 Mongoose Schemas (User, Wallet, Transaction, School, PaymentPlan, etc.)
├── /routes         # API endpoint definitions (45+ routes)
├── /utils          # Suspicious logic rules & Token generation
└── server.js       # Express entry point

/frontend
├── /src
│   ├── /components # Reusable UI components (Layout, Spinners, Alerts)
│   ├── /context    # React Context (Auth State)
│   ├── /pages      # 18 distinct responsive React pages
│   ├── /routes     # Protected and Admin route wrappers
│   ├── /services   # Axios API configurations
│   └── App.jsx     # Main React router tree
```

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
Make sure you have Node.js and MongoDB installed locally.

### 1. Install Dependencies
You need to install the `node_modules` for both the backend and frontend.
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file inside the `/backend` folder with the following variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/schoolfee-now
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
```

### 3. Run the Application locally
For your convenience, simply double-click the **`start.bat`** file located in the root directory. This will automatically launch the Backend server on `http://localhost:5000` and the React frontend on `http://localhost:5173`.

---

## 🌐 Deployment Information

- **Backend (Render/Heroku):** Set `NODE_ENV=production` and map your local environment variables into the platform dashboard.
- **Database (MongoDB Atlas):** Replace the local `MONGO_URI` in your production environment with your cloud connection string.
- **Frontend (Vercel/Netlify):** Update `frontend/src/services/api.js` to point away from `localhost` and towards your newly deployed backend URL.

### GitHub Sync
Double click the **`sync.bat`** script in the root directory. This will securely format, commit, and push your entire codebase directly to your GitHub repository while safely ignoring `.env` files via `.gitignore`.
