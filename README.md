# 🚀 JobTune — AI Resume Analyzer & Career Platform

> **Part of the [CodeSage](https://github.com/codesage) Suite** — *CodeSage reviews your code. JobTune reviews your career.*

An AI-powered career optimization platform that analyzes resumes, calculates ATS scores across 20+ parameters, provides AI-powered resume rewriting, JD targeting, LinkedIn profile optimization, job matching, and personalized career path recommendations — **all for free**.

Built with **Node.js + Express** (backend) and **React + Vite + TypeScript + Tailwind + shadcn/ui** (frontend).

---

## ✨ Features

- 📄 **Resume Upload & Smart Parsing** (PDF / DOC / DOCX) — with section detection, skill extraction, contact parsing
- 🎯 **ATS Score Analysis** — 20+ parameters across 5 categories (Impact, Skills, Structure, Experience, ATS Compatibility)
- � **Targeted Resume** — paste a job description, get a match score + missing keywords + auto-tailored resume
- 🧠 **AI Resume Rewriting** — rewrite bullets/sections with strong action verbs, quantifiable impact, and multiple tone options
- 🔗 **LinkedIn Profile Optimization** — score your headline, about, and experience; get AI-generated improvements
- 💼 **Job Matching Engine** — skill-based job recommendations with direct LinkedIn & Naukri apply links
- 📈 **Career Path Visualization** — interactive career roadmaps with skill gap analysis and learning resources
- 🔐 **Authentication** — JWT-based login/register with secure password hashing
- 📊 **Dashboard** — score history charts, recent activity, quick actions, career tips
- 📥 **PDF Export** — download your improved resume as a formatted PDF
- 📚 **Resume Version History** — track how your resume improves over time

---

## 🏗️ Project Structure

```
JobTune/
│
├── backend/
│   ├── src/
│   │   ├── config/            # DB, env, CORS configuration
│   │   ├── middleware/        # Auth, upload, error handling, rate limiting
│   │   ├── models/            # Mongoose schemas (User, Resume, Analysis)
│   │   ├── routes/            # Express route handlers
│   │   ├── services/          # Business logic (ATS, AI, jobs, career)
│   │   ├── utils/             # Skills DB, action verbs, helpers
│   │   └── app.ts             # Express app entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components (custom + shadcn/ui)
│   │   ├── pages/             # Route pages
│   │   ├── services/          # API client layer
│   │   ├── stores/            # Zustand state management
│   │   ├── types/             # Shared TypeScript types
│   │   └── App.tsx
│   └── vite.config.ts
│
├── Implementation plan.md     # Detailed project plan & task breakdown
├── .gitignore
└── README.md
```

---

## 🧑‍💻 Tech Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js (TypeScript)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Resume Parsing:** pdf-parse, mammoth
- **AI / NLP:** Google Gemini API
- **File Upload:** Multer
- **PDF Export:** PDFKit
- **Validation:** Zod

### Frontend
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** Zustand + React Query
- **Routing:** React Router v6

---

## ⚙️ Backend Setup (Local)

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/jobtune
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:8000
```

---

## 🌐 Frontend Setup (Local)

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000/api
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🚀 Deployment

### Backend → Render / Railway (Free Tier)
- **Runtime:** Node.js
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/app.js`
- **Env vars:** `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `GEMINI_API_KEY`

### Frontend → Vercel (Free Tier)
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Env var:** `VITE_API_URL` = your deployed backend URL

### Database → MongoDB Atlas (Free M0 Cluster)
- Region: Mumbai (AWS)
- Storage: 512MB (free tier)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get user profile |
| POST | `/api/resume/upload` | Upload & parse resume |
| GET | `/api/resume/history` | Get resume versions |
| POST | `/api/ats/score` | Analyze resume (ATS score) |
| GET | `/api/ats/history` | Score history for charts |
| POST | `/api/ai/rewrite` | AI rewrite a bullet/section |
| POST | `/api/ai/target` | Target resume to a JD |
| POST | `/api/jobs/match` | Get job recommendations |
| POST | `/api/career/recommend` | Get career path suggestions |
| POST | `/api/linkedin/optimize` | Optimize LinkedIn profile |

---

## 👥 Team

| Member | Role | Focus Areas |
|--------|------|-------------|
| **Akshat** | Full-Stack Lead | Backend architecture, core features, auth, ATS engine |
| **Anant** | Full-Stack Developer | Frontend pages, API integration, job matching, AI features |
| **Mahek** | Frontend & Content | About pages, info sections, career visualization, branding |

---

## � Part of CodeSage Suite

JobTune is part of the **CodeSage** ecosystem:

- 🔍 **CodeSage** — AI-powered code reviewer
- 📄 **JobTune** — AI-powered career optimizer

> *Together, we help developers write better code AND land better jobs.*

---

## 📌 Roadmap

- [x] Resume upload & parsing
- [x] Basic ATS scoring
- [ ] Node.js backend migration
- [ ] Authentication (JWT)
- [ ] 20+ parameter ATS scoring
- [ ] JD targeting & keyword analysis
- [ ] AI resume rewriting (Gemini)
- [ ] LinkedIn profile optimization
- [ ] User dashboard with score history
- [ ] Career path visualization
- [ ] PDF export
- [ ] Resume version tracking
- [ ] Google OAuth login
- [ ] Community features

---

## 📄 License

This project is open source. Feel free to fork, contribute, and star ⭐ the repo.

---

Happy building 🚀
