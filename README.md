# MERN Stack Internship Assignment

This is a clean, modern MERN (MongoDB, Express.js, React.js, Node.js) application designed for managing tasks, complete with JWT authentication, CRUD operations, status toggling, and clean visual cards.

## 🛠️ Tech Stack & Requirements
- **Frontend**: React (Vite, Functional Components, Hooks, Axios, React Router, Lucide Icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Authentication**: JWT, password hashing via bcrypt

---

## 📁 Repository Structure
- `/backend`: The Express API server, schema definitions, and token verification middlewares.
- `/frontend`: The React client application, customized styling, forms, and pages.
- `/package.json`: Orchestrates running both layers concurrently.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **MongoDB** running locally (or an accessible MongoDB Atlas URI)

### 2. Database & Environment Configuration
Verify that you have MongoDB running locally at `mongodb://127.0.0.1:27017/`.
The backend environment details are configured in `backend/.env`. You can adjust variables if necessary:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo-intern
JWT_SECRET=my_super_secure_jwt_secret_key_123456789
```

### 3. Run the Application
From the root directory, simply run:
```bash
npm run dev
```

This runs both the backend and frontend simultaneously:
- **Backend Server**: [http://localhost:5000](http://localhost:5000)
- **Frontend Vite Application**: [http://localhost:5173](http://localhost:5173)

---

## 🎨 UI/UX Features
- **Sidebar Welcome**: Welcomes user upon login.
- **Task Grid**: Responsive grid layout showing all tasks in interactive rounded cards.
- **Direct Toggle**: Click directly on the `Pending` or `Completed` badge in the task card to toggle its status instantly.
- **Search & Filters**: Instantly find tasks by keywords or filter them by status.
- **Interactive Modals**: Seamless task creation and update actions without page refreshes.
