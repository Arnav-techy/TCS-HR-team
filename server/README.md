# AI Employee Performance Analytics & Recommendation System

> **Course**: AI308B — AI Driven Full Stack Development  
> **Exam**: ESE B.Tech 4th Semester (Even Sem 2025-26)  
> **Stack**: MERN + OpenRouter AI + JWT Auth

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- OpenRouter API Key

### Backend Setup
```bash
cd server
npm install
# Edit .env with your credentials (see below)
npm run dev       # Development (nodemon)
npm start         # Production
```

### Frontend Setup
```bash
cd client
npm install
# Edit .env with your backend URL
npm run dev       # Vite dev server on port 3000
npm run build     # Production build → dist/
```

---

## ⚙️ Environment Variables

### `server/.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ese_hr_db
JWT_SECRET=your_super_secret_jwt_key_here
OPENROUTER_API_KEY=sk-or-your-key-here
NODE_ENV=development
```

### `client/.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register HR/Admin user |
| POST | `/api/auth/login` | Login → returns JWT |

### Employees (Protected — Bearer Token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | All employees (filter/search/sort) |
| POST | `/api/employees` | Add employee |
| GET | `/api/employees/:id` | Single employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

**Query Params for GET /api/employees:**
- `?department=Development`
- `?search=Aman`
- `?sort=performance_desc`

### AI Insights (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/recommend` | Single employee AI recommendation |
| POST | `/api/ai/rank-all` | Rank all employees |
| POST | `/api/ai/bulk-recommend` | Bulk recommendations |

---

## 🗃️ MongoDB Schemas

### Employee
```json
{ "name": "String", "email": "String (unique)", "department": "enum[6]", "skills": "[String]", "performanceScore": "0-100", "experience": "Number (years)" }
```

### User
```json
{ "name": "String", "email": "String (unique)", "password": "bcrypt hash", "role": "hr|admin" }
```

---

## 🤖 AI Logic

| Score Range | Recommendation Type |
|-------------|---------------------|
| ≥ 85 | 🚀 Promotion Recommendation |
| 50–84 | 📚 Training Suggestions |
| < 50 | ⚡ Improvement Feedback |

**Provider**: OpenRouter · **Model**: `mistralai/mistral-7b-instruct`

---

## 🚢 Deployment (Render.com)

### Backend (Web Service)
- Build: `npm install`
- Start: `node server.js`
- Env: `MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `NODE_ENV=production`

### Frontend (Static Site)
- Build: `npm install && npm run build`
- Publish Dir: `dist`
- Env: `VITE_API_BASE_URL=https://your-backend.onrender.com/api`

---

## 📁 Project Structure

```
emp-rec/
├── server/                    # Express backend
│   ├── config/db.js           # MongoDB connection
│   ├── models/                # Employee.js, User.js
│   ├── controllers/           # auth, employee, AI
│   ├── routes/                # authRoutes, employeeRoutes, aiRoutes
│   ├── middleware/            # auth, errorHandler, validation
│   ├── utils/                 # generateToken, aiPromptBuilder
│   └── server.js              # Entry point
└── client/                    # Vite + React frontend
    └── src/
        ├── components/        # 9 reusable components
        ├── pages/             # 7 pages
        ├── context/           # AuthContext
        ├── services/          # API service layer
        ├── hooks/             # useEmployees, useAI
        └── utils/             # formatters, constants
```
