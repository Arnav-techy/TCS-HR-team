# TCS-HR-team
AI-Based Employee Performance Analytics &amp;amp; Recommendation System
# AI Employee Performance Analytics & Recommendation System

A full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using OpenRouter AI API.

Built as part of the **ESE Examination — AI Driven Full Stack Development (AI308B)**, B.Tech 4th Semester, Even Sem 2025-26.

---

## 🔗 Live Demo

| Service | URL |
|---|---|
| Frontend | https://tcs-hr-team-1.onrender.com |
| Backend API | https://tcs-hr-team.onrender.com |

---

## Features

- JWT-based authentication (Signup / Login) with bcrypt password hashing
- Add, view, update, and delete employee records
- Search and filter employees by department
- AI-powered promotion recommendations, training suggestions, and performance feedback via OpenRouter
- Employee ranking using AI
- Responsive React UI with protected routes
- Deployed on Render (frontend + backend) with MongoDB Atlas

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Recharts

**Backend**
- Node.js
- Express.js
- Mongoose (MongoDB Atlas)
- JSON Web Token (JWT)
- bcryptjs
- express-validator

**AI**
- OpenRouter API (mistral-7b-instruct)

**Deployment**
- Render (Web Service + Static Site)
- MongoDB Atlas (M0 Free Tier)

---

## Project Structure

```
ese-ai-hr-system/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validateEmployee.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── aiPromptBuilder.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── hooks/
    ├── .env
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- OpenRouter API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ese-ai-hr-system.git
cd ese-ai-hr-system
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ese_hr_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxx
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

### Auth (Public)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new HR/Admin user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Employees (Protected — Bearer Token required)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/employees` | Add new employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get single employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/search?department=Development` | Filter by department |

### AI (Protected — Bearer Token required)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/recommend` | Get AI recommendation for an employee |
| POST | `/api/ai/rank-all` | AI ranking of all employees |
| POST | `/api/ai/bulk-recommend` | AI feedback for multiple employees |

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features |
| `VITE_API_BASE_URL` | Backend API base URL (frontend) |

---

## Deployment on Render

### Backend (Web Service)

| Field | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

Add all environment variables from `server/.env` in the Render dashboard.

### Frontend (Static Site)

| Field | Value |
|---|---|
| Root Directory | `client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Set `VITE_API_BASE_URL` to your live Render backend URL.

---

## Screenshots

> Add screenshots here — Employee list, AI recommendations, Postman requests, MongoDB Atlas collections, Render deployment.

---

## License

This project was built for academic examination purposes — B.Tech CSE, 4th Semester, Even Sem 2025-26.
