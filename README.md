# 💰 Expense Tracker

A full-stack expense tracking application with budget forecasting, recurring transactions, and beautiful analytics.

**[🚀 View Live Demo](https://your-deployment-link.com)** *(Update this link after deployment)*

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### Core Features
- **Expense Management** - Add, update, delete, and list expenses with pagination
- **Budget Management** - Set monthly budgets and track spending
- **Budget Forecasting** - Linear regression-based prediction of month-end spending
- **Recurring Transactions** - Automated expense scheduling (daily/weekly/monthly/yearly)
- **Analytics Dashboard** - Category-wise and monthly expense visualization

### Security & Performance
- **JWT Authentication** - Secure token-based authentication (7-day expiry)
- **Rate Limiting** - Protection against API abuse (50/100 requests per 15 min)
- **Password Hashing** - bcrypt with salt rounds

### Developer Experience
- **Swagger API Docs** - Interactive API documentation at `/api-docs`
- **Auto-logout** - Frontend automatically handles token expiration

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| node-cron | Scheduled jobs |
| express-rate-limit | Rate limiting |
| swagger-jsdoc | API documentation |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router | Navigation |
| Axios | HTTP client |
| Chart.js | Data visualization |
| Tailwind CSS | Styling |
| Lucide React | Icons |

## 📁 Project Structure

```
├── src/
│   ├── config/          # Database & Swagger config
│   ├── controllers/     # Request handlers
│   ├── jobs/            # Cron jobs
│   ├── middlewares/     # Auth & rate limiting
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── swagger/         # API documentation
│   └── utils/           # Helper functions
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── api.js       # Axios instance
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhavyagautam08/Expense_Tracker.git
   cd Expense_Tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Create environment files**
   ```bash
   # In the root directory (Backend)
   cp .env.example .env
   # Open .env and add your MongoDB URI and JWT Secret
   
   # In the frontend directory (Frontend)
   cd frontend
   cp .env.example .env
   # Ensure VITE_API_URL is set correctly
   cd ..
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - API Docs: http://localhost:3000/api-docs

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/profile` | Get user profile |
| PATCH | `/api/v1/auth/avatar` | Update avatar |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/expenses` | Add expense |
| GET | `/api/v1/expenses` | List expenses (paginated) |
| GET | `/api/v1/expenses/analytics` | Get analytics |
| PUT | `/api/v1/expenses/:id` | Update expense |
| DELETE | `/api/v1/expenses/:id` | Delete expense |

### Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/budgets` | Set budget |
| GET | `/api/v1/budgets` | Get budgets |
| GET | `/api/v1/forecast` | Get budget forecast |

### Recurring Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/recurring` | Create recurring |
| GET | `/api/v1/recurring` | List recurring |
| PUT | `/api/v1/recurring/:id` | Update recurring |
| DELETE | `/api/v1/recurring/:id` | Delete recurring |
| PATCH | `/api/v1/recurring/:id/toggle` | Toggle active |

## 🔒 Rate Limiting

| Route | Limit | Window |
|-------|-------|--------|
| Auth (`/auth/*`) | 50 requests | 15 minutes |
| API (`/api/v1/*`) | 100 requests | 15 minutes |
| Docs (`/api-docs`) | 200 requests | 15 minutes |

## 🎨 Avatar System

Users can choose from 8 emoji avatars:
- 👨‍💼 👩‍💻 🧑‍🎨 👨‍🚀 👩‍🔬 🧑‍🎤 👨‍🍳 👩‍🎓

## 📊 Screenshots

*Coming soon*

## ☁️ Deployment

### Backend (Render / Heroku)
1. Connect your GitHub repository to your hosting provider.
2. Set the Root Directory to the repository root.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add your `.env` variables (MONGO_URI, JWT_SECRET, PORT) in the platform's environment settings.

### Frontend (Vercel / Netlify)
1. Connect your repository to Vercel/Netlify.
2. Set the Root Directory to `frontend`.
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add `VITE_API_URL` environment variable pointing to your deployed backend URL.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Bhavya Gautam**
- GitHub: [@Bhavyagautam08](https://github.com/Bhavyagautam08)
