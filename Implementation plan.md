# 📋 JobTune v2.0 — Complete Implementation Plan

> **Project:** JobTune — AI Resume Analyzer & Career Platform  
> **Inspiration:** [ResumeWorded.com](https://resumeworded.com) (we provide their premium features **for free**)  
> **Parent Brand:** CodeSage (Code Reviewer) — same domain ecosystem   


---

## 📖 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Current State Analysis](#-current-state-analysis)
3. [Vision & Goals](#-vision--goals)
4. [Tech Stack Migration](#-tech-stack-migration)
5. [Feature Breakdown](#-feature-breakdown)
6. [Architecture Overview](#-architecture-overview)
7. [Page-by-Page Specification](#-page-by-page-specification)
8. [CodeSage Integration Strategy](#-codesage-integration-strategy)
9. [Work Division](#-work-division)
10. [Sprint Plan & Timeline](#-sprint-plan--timeline)
11. [API Endpoint Specification](#-api-endpoint-specification)
12. [Database Schema](#-database-schema)
13. [Deployment Strategy](#-deployment-strategy)
14. [Testing Strategy](#-testing-strategy)

---

## 🧭 Executive Summary

JobTune v2.0 is a **complete overhaul** of the existing AI Resume Analyzer. We are transforming it from a simple resume-upload-and-score tool into a **full-fledged career optimization platform** that rivals — and exceeds — what ResumeWorded offers behind a paywall. Our users get **everything for free**: deep resume scoring across 20+ parameters, AI-powered resume rewriting, job-description targeting, LinkedIn profile optimization tips, resume version history, and a personalized career dashboard.

The backend is being **migrated from Python (FastAPI) to Node.js (Express)**, giving us a unified JavaScript/TypeScript stack across both frontend and backend. The frontend stays on **React + Vite + TypeScript + Tailwind CSS + shadcn/ui** but receives a massive UI/UX overhaul with new pages, authentication, dashboard, and premium design.

JobTune exists under the **CodeSage** umbrella brand. CodeSage is our AI-powered code reviewer; JobTune is the career-focused sibling. Together, they form the **CodeSage Suite** — tools that help developers write better code AND land better jobs.

---

## 🔍 Current State Analysis

### What Exists Today

| Layer | Technology | Files | Status |
|-------|-----------|-------|--------|
| Backend | FastAPI (Python) | `main.py`, 4 route files, 10 service files | Functional but basic |
| Frontend | React + Vite + TS + Tailwind + shadcn/ui | 6 custom components, 2 pages, 51 UI primitives | Functional but minimal |
| Database | None (CSV file for jobs) | `jobs.csv` | No persistence |
| Auth | None | — | Missing entirely |
| Deployment | Render (free tier) | — | Basic |

### Current Features (v1.0)

1. **Resume Upload** — PDF/DOC/DOCX upload with text extraction
2. **ATS Score** — Basic scoring on 5 parameters (skills count, resume length, action verbs, experience years, formatting) — scores clamped between 65–95
3. **Job Recommendations** — CSV-based matching using skill overlap, generates LinkedIn/Naukri search links
4. **Career Path** — Hardcoded career paths (10 roles) with skill gap analysis and learning resource links
5. **AI Rewriting** — Uses `google/flan-t5-base` via HuggingFace Transformers to rewrite individual resume bullets

### Current Weaknesses

- **No authentication** — no user accounts, no saved history
- **No dashboard** — single-page app with tabs
- **Shallow ATS scoring** — only 5 parameters, score is artificially clamped
- **No job description targeting** — can't compare resume against a specific JD
- **Hardcoded skill database** — only 15 skills recognized
- **No resume version history** — users can't track improvements
- **No LinkedIn optimization** — missing entirely
- **Basic UI** — functional but not premium; no landing page, no about page
- **Python backend** — works but creates a split-stack (Python + JS)
- **No database** — everything is ephemeral

---

## 🎯 Vision & Goals

### What ResumeWorded Offers (and we'll match FOR FREE)

| ResumeWorded Feature | Their Pricing | Our Version |
|---------------------|---------------|-------------|
| Score My Resume (basic) | Free | ✅ Free — with **more parameters** |
| Detailed line-by-line feedback | **Premium ($29/mo)** | ✅ **Free** |
| Targeted Resume (match to JD) | **Premium** | ✅ **Free** |
| AI Resume Rewriting | **Premium** | ✅ **Free** |
| LinkedIn Profile Review | **Premium** | ✅ **Free** |
| Resume Samples/Templates | **Premium** | ✅ **Free** |
| Resume History & Tracking | **Premium** | ✅ **Free** |
| Career Path Guidance | Not offered | ✅ **Free** (our unique feature) |
| Job Matching | Not offered | ✅ **Free** (our unique feature) |

### Our Unique Additions Beyond ResumeWorded

1. **CodeSage Integration** — developers can link their code review profile to showcase coding quality
2. **Job Matching Engine** — not just scoring, but actually finding and ranking jobs
3. **Career Path Visualization** — interactive career roadmaps with skill gap analysis
4. **Multi-format Export** — export improved resumes as PDF, DOCX
5. **Community Features** — share anonymized resume scores (future roadmap)

---

## 🔧 Tech Stack Migration

### Old Stack → New Stack

| Component | Old (v1.0) | New (v2.0) | Reason |
|-----------|-----------|-----------|--------|
| **Backend Runtime** | Python 3.x | **Node.js 20+** | Unified JS/TS stack |
| **Backend Framework** | FastAPI | **Express.js + TypeScript** | Industry standard, massive ecosystem |
| **Resume Parsing** | pdfminer.six, python-docx | **pdf-parse, mammoth** | Native Node.js libraries |
| **AI/NLP** | HuggingFace Transformers (local) | **Google Gemini API / OpenAI API** | Cloud-based, no heavy model downloads |
| **Database** | None (CSV) | **MongoDB (Mongoose)** | Document-based, perfect for resume data |
| **Authentication** | None | **JWT + bcrypt** | Stateless auth with secure password hashing |
| **File Upload** | python-multipart | **Multer** | Standard Express file handling |
| **Job Data** | CSV file | **MongoDB collection + web scraping** | Scalable, real-time |
| **PDF Export** | ReportLab | **PDFKit / Puppeteer** | Node-native PDF generation |
| **Validation** | Pydantic | **Zod (shared with frontend)** | Schema validation, shared types |
| **Frontend** | React + Vite + TS + Tailwind + shadcn/ui | **Same (enhanced)** | Already excellent stack |
| **State Management** | React Query + useState | **React Query + Zustand** | Better global state for auth/user data |

### New Backend Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.ts                # MongoDB connection
│   │   ├── env.ts               # Environment variables
│   │   └── cors.ts              # CORS settings
│   ├── middleware/
│   │   ├── auth.ts              # JWT verification middleware
│   │   ├── upload.ts            # Multer file upload config
│   │   ├── errorHandler.ts      # Global error handler
│   │   └── rateLimiter.ts       # Rate limiting
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── Resume.ts            # Resume schema (versions)
│   │   └── Analysis.ts          # Analysis results schema
│   ├── routes/
│   │   ├── auth.routes.ts       # Login, Register, Profile
│   │   ├── resume.routes.ts     # Upload, Parse, History
│   │   ├── ats.routes.ts        # Scoring, Feedback
│   │   ├── job.routes.ts        # Job matching
│   │   ├── career.routes.ts     # Career path
│   │   ├── ai.routes.ts         # AI rewriting, targeting
│   │   └── linkedin.routes.ts   # LinkedIn optimization
│   ├── services/
│   │   ├── resumeParser.ts      # PDF/DOCX text extraction
│   │   ├── atsScorer.ts         # Multi-parameter ATS scoring
│   │   ├── jobMatcher.ts        # Job recommendation engine
│   │   ├── careerRecommender.ts # Career path logic
│   │   ├── aiRewriter.ts        # AI resume bullet rewriter
│   │   ├── jdTargeter.ts        # Job description targeting
│   │   ├── linkedinOptimizer.ts # LinkedIn profile tips
│   │   ├── pdfExporter.ts       # PDF generation
│   │   └── emailService.ts      # Email notifications
│   ├── utils/
│   │   ├── skillsDatabase.ts    # Expanded skills list (200+)
│   │   ├── actionVerbs.ts       # Comprehensive action verbs
│   │   ├── scoringRubrics.ts    # Detailed scoring criteria
│   │   └── helpers.ts           # Utility functions
│   └── app.ts                   # Express app setup
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 📦 Feature Breakdown

### Feature F1: Authentication & User Management
**Priority:** 🔴 Critical  
**Owner:** Akshat & Anant

- **Register** — email + password signup with email validation
- **Login** — JWT-based login, refresh tokens
- **Profile** — name, email, avatar, career preferences
- **Password Reset** — email-based password recovery
- **Session Management** — auto-logout on token expiry, "remember me"

**Technical Details:**
- Passwords hashed with `bcrypt` (salt rounds: 12)
- JWT access tokens (15 min expiry) + refresh tokens (7 days)
- MongoDB `users` collection
- Protected routes via `auth` middleware

---

### Feature F2: Resume Upload & Parsing (Enhanced)
**Priority:** 🔴 Critical  
**Owner:** Akshat & Anant

- **Multi-format support** — PDF, DOC, DOCX
- **Smart section detection** — identify Education, Experience, Skills, Projects, Certifications
- **Contact extraction** — name, email, phone, LinkedIn URL
- **Skill extraction** — match against expanded database of 200+ skills
- **Experience calculation** — regex-based year extraction + date range calculation
- **Resume version history** — store every uploaded resume, show diff between versions

**Technical Details:**
- `pdf-parse` for PDF text extraction
- `mammoth` for DOCX conversion
- Custom regex patterns for section headers
- Each upload creates a new `Resume` document in MongoDB linked to user

---

### Feature F3: ATS Score Analysis (Premium — FREE)
**Priority:** 🔴 Critical  
**Owner:** Akshat & Anant

This is where we **massively exceed** ResumeWorded. Instead of their 5-6 scoring categories, we score on **20+ parameters** grouped into 5 major categories:

#### Category 1: Impact & Achievement (25 points)
| Parameter | Points | What We Check |
|-----------|--------|---------------|
| Quantifiable metrics | 8 | Numbers, percentages, dollar amounts in bullets |
| Action verb usage | 7 | Strong action verbs at start of each bullet |
| Achievement vs. responsibility | 5 | "Increased X by Y%" vs "Responsible for X" |
| Result-oriented language | 5 | Outcome-focused phrasing |

#### Category 2: Skills & Keywords (25 points)
| Parameter | Points | What We Check |
|-----------|--------|---------------|
| Hard skills count | 8 | Technical skills relevant to target role |
| Soft skills presence | 4 | Leadership, communication, teamwork |
| Industry keywords | 8 | ATS-optimized terminology |
| Skills section formatting | 5 | Properly categorized skill sections |

#### Category 3: Structure & Formatting (20 points)
| Parameter | Points | What We Check |
|-----------|--------|---------------|
| Section organization | 5 | Standard sections present and ordered |
| Resume length | 5 | Optimal word count (400-800) |
| Bullet point usage | 5 | Bullets vs paragraphs ratio |
| Consistency | 5 | Date formats, tense, capitalization |

#### Category 4: Experience & Education (20 points)
| Parameter | Points | What We Check |
|-----------|--------|---------------|
| Experience relevance | 8 | Alignment with target role |
| Education details | 5 | Degree, institution, GPA/honors |
| Certifications | 4 | Professional certs listed |
| Projects | 3 | Relevant project descriptions |

#### Category 5: ATS Compatibility (10 points)
| Parameter | Points | What We Check |
|-----------|--------|---------------|
| No tables/columns | 3 | Clean single-column format |
| No images/graphics | 2 | Text-only content |
| Standard fonts | 2 | No decorative fonts |
| File format compatibility | 3 | PDF/DOCX adherence |

**Total: 100 points** (no more artificial clamping!)

**Line-by-Line Feedback:**  
Every line of the resume gets analyzed and color-coded:
- 🟢 **Strong** — well-written, ATS-optimized
- 🟡 **Needs improvement** — good but could be better, with specific suggestions
- 🔴 **Weak** — needs significant rewriting, with AI-generated alternatives

---

### Feature F4: Targeted Resume (Match to Job Description)
**Priority:** 🟡 High  
**Owner:** Akshat & Anant

ResumeWorded charges $29/month for this. We offer it **free**.

- User pastes a job description
- System analyzes JD to extract: required skills, preferred skills, experience level, key responsibilities
- Compares resume against JD requirements
- Generates a **match score** (0-100)
- Shows **missing keywords** that should be added
- Highlights **matching keywords** already present
- Provides **specific suggestions** to tailor the resume for that exact job
- Generates a **tailored version** of the resume with AI

---

### Feature F5: AI Resume Rewriting
**Priority:** 🟡 High  
**Owner:** Akshat & Anant

- **Bullet-by-bullet rewriting** — rewrite individual bullets with stronger action verbs, quantifiable impact
- **Full section rewriting** — rewrite entire Experience or Skills section
- **Tone options** — professional, technical, creative, executive
- **Before/After comparison** — show original vs improved side-by-side
- Uses **Google Gemini API** (free tier available) instead of local HuggingFace models

---

### Feature F6: LinkedIn Profile Optimization
**Priority:** 🟡 High  
**Owner:** Akshat & Anant

- User pastes their LinkedIn profile text (headline, about, experience)
- Scores the profile on: headline strength, about section, keyword density, recommendation count tip
- Provides specific improvement suggestions
- Generates optimized headline and about section alternatives

---

### Feature F7: Job Matching Engine (Enhanced)
**Priority:** 🟡 High  
**Owner:** Akshat & Anant

- Move from CSV to **MongoDB-based job collection**
- Match jobs based on: skills overlap, experience level, location preference, salary range
- Generate direct application links (LinkedIn, Naukri, Indeed)
- Filter by: job type (internship/full-time), location, remote/hybrid/onsite
- Sort by: match score, date posted, company rating

---

### Feature F8: Career Path Visualization
**Priority:** 🟢 Medium  
**Owner:** Akshat & Anant (backend logic) + **Mahek** (frontend visualization component)

- Interactive career roadmap visualization (timeline/flowchart style)
- Show current position → next steps → long-term goals
- Skill gap analysis with learning resource links
- Salary benchmarking data (indicative ranges)
- Expand from 10 to **30+ career paths**

---

### Feature F9: User Dashboard
**Priority:** 🔴 Critical  
**Owner:** Akshat & Anant (structure + data sections) + **Mahek** (info/about section within dashboard)

The dashboard is the **central hub** after login:

#### Dashboard Sections:
1. **Welcome Banner** — greeting with user name, resume score trend sparkline
2. **Quick Stats Cards** — latest ATS score, resumes uploaded, jobs matched, profile completeness
3. **Resume Score History** — chart showing score improvement over time (line/area chart)
4. **Recent Activity Feed** — last 5 actions (uploads, analyses, rewrites)
5. **Quick Actions** — upload resume, target a JD, optimize LinkedIn, view career path
6. **Info Section** — tips, articles, career advice (Mahek's section)
7. **CodeSage Integration Widget** — link to CodeSage profile, combined score

---

### Feature F10: Landing Page (Redesigned)
**Priority:** 🔴 Critical  
**Owner:** Akshat & Anant (hero, features, CTA sections) + **Mahek** (testimonials, about brand, info blocks)

Premium landing page inspired by ResumeWorded but with our own brand identity:

1. **Hero Section** — bold headline, animated resume score demo, CTA buttons
2. **Social Proof Bar** — "Trusted by X users" with university/company logos
3. **Feature Showcase** — 3-column grid (Score, Target, Optimize) with animations
4. **How It Works** — 3-step process with illustrations
5. **Comparison Table** — "JobTune vs ResumeWorded" showing our free features
6. **Testimonials** — user quotes with avatars
7. **About / Brand Section** — CodeSage ecosystem intro (Mahek)
8. **CTA Footer** — "Get started for free" with signup

---

### Feature F11: About / Information Pages
**Priority:** 🟡 High  
**Owner:** **Mahek** (primary owner)

These pages tell our story and connect JobTune to CodeSage:

1. **About Us Page** — team intro, mission statement, CodeSage ecosystem explanation
2. **How It Works Page** — detailed walkthrough of each feature with visuals
3. **FAQ Page** — common questions about ATS, resume best practices, pricing (free!)
4. **Contact Page** — contact form, social links
5. **Privacy Policy** — data handling, resume storage policies
6. **Terms of Service** — usage terms

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT (Browser)                       │
│  React + Vite + TypeScript + Tailwind + shadcn/ui + Zustand │
│                                                              │
│  Pages: Landing | Login | Register | Dashboard | Upload      │
│         Score | Target | LinkedIn | Career | About | FAQ     │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                │
│                                                              │
│  Auth ──► Resume Parser ──► ATS Scorer ──► AI Rewriter      │
│  JWT       pdf-parse         20+ params     Gemini API       │
│            mammoth                                           │
│                                                              │
│  Job Matcher ──► Career Engine ──► LinkedIn Optimizer        │
│  MongoDB         30+ paths         Profile analysis          │
│                                                              │
│  Middleware: auth │ rateLimiter │ errorHandler │ upload       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB Atlas)                   │
│                                                              │
│  Collections: users │ resumes │ analyses │ jobs              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📄 Page-by-Page Specification

### Page 1: Landing Page (`/`)
- Public (no auth required)
- Hero with animated score preview
- Feature showcase cards
- "Free vs Premium" comparison showing we're free
- CTA → Register / Login

### Page 2: Login Page (`/login`)
- Email + password form
- "Remember me" checkbox
- "Forgot password" link
- Social login buttons (future: Google OAuth)
- Link to Register

### Page 3: Register Page (`/register`)
- Name, email, password, confirm password
- Terms acceptance checkbox
- Auto-login after registration
- Welcome email (future)

### Page 4: Dashboard (`/dashboard`) — Protected
- Welcome banner with user greeting
- Quick stats cards (ATS score, uploads count, etc.)
- Resume score history chart
- Recent activity feed
- Quick action buttons
- Info section (career tips / articles — Mahek)
- CodeSage integration widget

### Page 5: Resume Upload & Analysis (`/analyze`) — Protected
- Drag-and-drop file upload area
- Upload progress indicator
- Parsed resume preview (sections highlighted)
- Tabs: ATS Score | Line Feedback | Suggestions

### Page 6: ATS Score Detail (`/score/:id`) — Protected
- Circular score gauge (animated fill)
- 5 category breakdowns with individual scores
- 20+ parameter details in expandable sections
- Line-by-line feedback with color coding
- "Improve with AI" button for each weak line
- Export improved resume as PDF

### Page 7: Target Resume (`/target`) — Protected
- Two-panel layout: Resume on left, JD on right
- Paste/type JD area
- Match score display
- Missing keywords highlighted
- Matched keywords highlighted
- "Auto-tailor my resume" button
- Download tailored version

### Page 8: LinkedIn Optimizer (`/linkedin`) — Protected (Future... Most likely not)
- Text input for LinkedIn headline, about, experience
- Scoring on multiple LinkedIn-specific parameters
- AI-generated improved versions
- Tips sidebar

### Page 9: Career Path (`/career`) — Protected
- Interactive career roadmap (visual flowchart)
- Skill gap analysis
- Learning resources per missing skill
- Role descriptions and salary ranges

### Page 10: Job Matches (`/jobs`) — Protected
- Filtered job listings
- Match score per job
- Direct apply links
- Filter sidebar (type, location, remote/onsite)

### Page 11: About Page (`/about`) — Public
- Team section with photos/bios
- Mission & vision
- CodeSage ecosystem explanation
- How JobTune connects with CodeSage

### Page 12: How It Works (`/how-it-works`) — Public
- Step-by-step feature walkthrough
- Animated illustrations
- Feature comparison with competitors

### Page 13: FAQ (`/faq`) — Public
- Accordion-style Q&A
- Categories: General, ATS, Resume Tips, Technical

### Page 14: Contact (`/contact`) — Public
- Contact form (name, email, message)
- Social media links
- Response time expectations

### Page 15: Profile Settings (`/settings`) — Protected
- Edit name, email, avatar
- Change password
- Career preferences
- Notification settings
- Delete account

---

## 🔗 CodeSage Integration Strategy

### The Brand Connection

**CodeSage** is our AI-powered code reviewer. **JobTune** is our AI-powered career optimizer. Together, they form the **CodeSage Suite**:

> *"CodeSage reviews your code. JobTune reviews your career. Together, they make you unstoppable."*

### Visual & Brand Consistency

| Element | CodeSage | JobTune |
|---------|----------|---------|
| Logo | CodeSage icon + wordmark | JobTune icon + "by CodeSage" subtitle |
| Color scheme | Shared primary palette (blues/purples) | Same palette, slight accent variation |
| Typography | Same font family (Inter or similar) | Same |
| Navigation | "Switch to JobTune" link in navbar | "Switch to CodeSage" link in navbar |
| Footer | Shared footer with both product links | Same |
| Domain feel | `codesage.com/code` (conceptual) | `codesage.com/career` (conceptual) |

### Feature Integration Points

1. **Shared Auth** — single account for both platforms (future SSO)
2. **Developer Score** — combine code review score + resume score into a "Developer Profile Score"
3. **GitHub Integration** — CodeSage's code analysis data can auto-populate "Projects" section in resume
4. **Cross-promotion** — Each platform promotes the other in dashboard widgets
5. **Unified Header** — both platforms share a common header with product switcher

### Ideas for Mahek — Making the Connection Feel Natural

1. **"Powered by CodeSage" badge** — subtle branding on every page
2. **About page story** — "We started with CodeSage to help developers write better code. Then we realized — what good is great code if you can't land the job? That's why we built JobTune."
3. **Shared landing page section** — "Part of the CodeSage ecosystem" with product cards
4. **Blog/Info section** — articles that bridge both worlds ("How Your GitHub Profile Affects Your Resume", "From Code Reviews to Career Reviews")
5. **Developer-focused marketing** — "The only resume tool built BY developers, FOR developers"

---

## 👥 Work Division

### 🧑‍💻 Akshat & Anant — Core Development Team

Akshat and Anant handle the **heavy lifting**: backend migration, core features, authentication, and the primary frontend components. They are responsible for all business logic, API design, and database architecture.

#### Backend Tasks (Akshat & Anant)

| # | Task | Description | Priority | Est. Hours |
|---|------|-------------|----------|------------|
| B1 | **Project Setup** | Initialize Node.js + Express + TypeScript project, configure ESLint, Prettier, MongoDB connection | 🔴 | 3 |
| B2 | **Auth System** | User model, register/login/logout endpoints, JWT middleware, password hashing, refresh tokens | 🔴 | 6 |
| B3 | **Resume Upload & Parsing** | Multer setup, PDF/DOCX parsing, section detection, skill extraction, store in MongoDB | 🔴 | 8 |
| B4 | **ATS Scoring Engine** | Implement 20+ parameter scoring across 5 categories, line-by-line feedback generation | 🔴 | 10 |
| B5 | **JD Targeting Service** | Parse job descriptions, keyword extraction, match scoring, gap analysis, suggestions | 🟡 | 6 |
| B6 | **AI Rewriter Service** | Gemini API integration, bullet rewriting, full section rewriting, tone options | 🟡 | 5 |
| B7 | **Job Matching Engine** | MongoDB job collection, skill-based matching, filtering, sorting, link generation | 🟡 | 5 |
| B8 | **Career Recommender** | Expand to 30+ paths, skill gap logic, learning resources, salary data | 🟢 | 4 |
| B9 | **LinkedIn Optimizer** | Profile text analysis, headline scoring, keyword density, AI suggestions | 🟡 | 4 |
| B10 | **PDF Export** | Generate improved resume as downloadable PDF using PDFKit | 🟢 | 3 |
| B11 | **Resume History** | Version tracking, diff between versions, score trends | 🟢 | 3 |
| B12 | **Rate Limiting & Security** | Rate limiter, input sanitization, CORS config, Helmet security headers | 🟢 | 2 |


#### Frontend Tasks (Akshat & Anant)

| # | Task | Description | Priority | Est. Hours |
|---|------|-------------|----------|------------|

| F1 | **ATS Score Page** | Animated circular gauge, 5 category breakdowns, expandable parameter details, line feedback with colors | 🔴 | 8 |
| F2 | **JD Targeting Page** | Two-panel layout, JD input area, match score display, keyword highlighting, auto-tailor button | 🟡 | 6 |
| F3 | **AI Rewriter UI** | Before/after comparison panels, tone selector, rewrite buttons per line/section | 🟡 | 5 |
| F4 | **Job Matches Page** | Job cards list, match score badges, filter sidebar, direct apply links | 🟡 | 5 |
| F5 | **Profile Settings Page** | Edit profile form, change password, career preferences, delete account | 🟢 | 3 |
| F6 | **Protected Route Wrapper** | Auth guard component, redirect to login if not authenticated, loading states | 🔴 | 2 |
| F7 | **Global Layout** | Navbar with auth state, sidebar (dashboard), footer, responsive design | 🔴 | 4 |
| F8 | **Landing Page (core)** | Hero section, feature showcase, CTA sections, comparison table, animations | 🔴 | 6 |
| F9 | **State Management** | Zustand store for auth, user data, resume state; React Query for API calls | 🔴 | 3 |
| F10 | **API Service Layer** | Axios/fetch wrapper, interceptors for JWT, error handling, TypeScript types | 🔴 | 3 |

**Frontend Total: ~67 hours**

---

### 👩‍💻 Mahek — Information, Content & Feature Components

Mahek is responsible for all **informational pages**, **content sections**, the **About/Brand experience**, and specific feature components. Her work ties JobTune to the CodeSage brand and ensures the platform has depth beyond just tools.

#### Mahek's Primary Tasks

| # | Task | Description | Priority | Est. Hours |
|---|------|-------------|----------|------------|
| F1 | **Auth Pages** | Login page, Register page, Forgot Password page — forms, validation, error handling, JWT storage | 🔴 | 5 |
| F2 | **Dashboard Page** | Welcome banner, stats cards, score history chart (Recharts), recent activity, quick actions | 🔴 | 8 |
| F3 | **Resume Upload Component** | Drag-and-drop zone, upload progress, parsed preview with section highlighting | 🔴 | 5 |
| M1 | **About Us Page** | Full about page: team bios (Akshat, Anant, Mahek — with photos/placeholders), mission statement, vision, CodeSage ecosystem explanation, "Our Story" narrative, tech stack showcase | 🔴 | 6 |
| M2 | **How It Works Page** | Step-by-step feature walkthrough with visual guides: (1) Upload → (2) Score → (3) Improve → (4) Target → (5) Land the Job. Include feature cards with icons and descriptions | 🔴 | 5 |
| M3 | **FAQ Page** | Comprehensive FAQ with accordion UI — organize by categories (General, ATS Basics, Resume Tips, Account, Technical). Write 20+ Q&A pairs covering common user questions | 🟡 | 4 |
| M4 | **Contact Page** | Contact form (name, email, subject, message), social media links, support email, "We typically respond within 24 hours" messaging | 🟡 | 3 |
| M5 | **Privacy Policy Page** | Professional privacy policy covering: data collection, resume storage, third-party services, user rights, data deletion, cookies | 🟡 | 3 |
| M6 | **Terms of Service Page** | Usage terms, acceptable use, intellectual property, disclaimers, limitation of liability | 🟡 | 3 |
| M7 | **Landing Page Sections** | Design and build: testimonials section (create 4-6 realistic testimonials), brand/ecosystem section ("Part of CodeSage Suite"), social proof bar | 🔴 | 5 |
| M8 | **Dashboard Info Section** | Career tips widget, "Did You Know?" cards, rotating career advice, links to blog/resources, motivational stats | 🟡 | 4 |
| M9 | **Career Path Visualization** | Interactive career roadmap component (visual flowchart/timeline). Take data from API and render it as an engaging visual journey, NOT just a list | 🟡 | 6 |
| M10 | **Footer Component** | Shared footer across all pages: product links (JobTune, CodeSage), social icons, newsletter signup placeholder, copyright, quick links | 🟢 | 2 |
| M11 | **Error & Empty States** | Design and build: 404 page, empty dashboard state, no results state, error boundary UI — all should feel on-brand and not jarring | 🟢 | 3 |
| M12 | **Loading & Skeleton States** | Implement skeleton loading screens for: dashboard, score page, job matches — smooth shimmer animations | 🟢 | 2 |
| M13 | **CodeSage Branding** | "Powered by CodeSage" badge component, product switcher in navbar, unified color theming, brand consistency review | 🟡 | 3 |


---

## 📅 Sprint Plan & Timeline

### Sprint 1: Foundation (Week 1-2)
**Goal:** Backend is set up, auth works, resume upload works. Frontend has auth pages and basic layout.

| Task | Owner | 
|------|-------|-------------|
| B1: Node.js project setup + MongoDB | Akshat & Anant 
| B2: Auth system (register, login, JWT) | Akshat & Anant
| B3: Resume upload + parsing | Akshat & Anant 
| F1: Auth pages (Login, Register) | Akshat & Anant
| F10: Protected route wrapper | Akshat & Anant | 
| F11: Global layout (navbar, sidebar) | Akshat & Anant 
| F13: Zustand + React Query setup | Akshat & Anant 
| F14: API service layer | Akshat & Anant 
| M1: About Us page | Mahek 
| M10: Footer component | Mahek 
| M13: CodeSage branding elements 

### Sprint 2: Core Features (Week 3-4)
**Goal:** ATS scoring, dashboard, landing page, and info pages are functional.

| Task | Owner 
|------|-------|-------------|
| B4: ATS scoring engine (20+ params) | Akshat & Anant 
| F2: Dashboard page | Akshat & Anant 
| F3: Resume upload component | Akshat & Anant 
| F4: ATS score page | Akshat & Anant 
| F12: Landing page (core sections) | Akshat & Anant 
| M2: How It Works page | Mahek 
| M3: FAQ page | Mahek 
| M7: Landing page sections (testimonials, brand) | Mahek 
| M8: Dashboard info section | Mahek 

### Sprint 3: Advanced Features (Week 5-6)
**Goal:** JD targeting, AI rewriting, job matching, LinkedIn optimizer.

| Task | Owner 
|------|-------|-------------|
| B5: JD targeting service | Akshat & Anant 
| B6: AI rewriter service | Akshat & Anant 
| B7: Job matching engine | Akshat & Anant
| B9: LinkedIn optimizer | Akshat & Anant
| F5: JD targeting page | Akshat & Anant 
| F6: AI rewriter UI | Akshat & Anant 
| F7: Job matches page | Akshat & Anant 
| F8: LinkedIn optimizer page | Akshat & Anant
| M4: Contact page | Mahek 
| M5: Privacy Policy page | Mahek 
| M6: Terms of Service page | Mahek 
| M9: Career path visualization | Mahek 
| M11: Error & empty states | Mahek 
| M12: Loading skeletons | Mahek 

### Sprint 4: Polish & Deploy (Week 7)
**Goal:** Testing, bug fixes, performance, deployment.

| Task | Owner |
|------|-------|
| B8: Career recommender expansion | Akshat & Anant |
| B10: PDF export | Akshat & Anant |
| B11: Resume history | Akshat & Anant |
| B12: Rate limiting & security | Akshat & Anant |
| F9: Profile settings page | Akshat & Anant |
| Integration testing | All |
| Bug fixes & polish | All |
| Deployment | Akshat & Anant |

---

## 🔌 API Endpoint Specification

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Create new user account | ❌ |
| POST | `/api/auth/login` | Login, returns JWT + refresh token | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ (needs refresh token) |
| POST | `/api/auth/logout` | Invalidate refresh token | ✅ |
| GET | `/api/auth/me` | Get current user profile | ✅ |
| PUT | `/api/auth/profile` | Update user profile | ✅ |
| POST | `/api/auth/forgot-password` | Send password reset email | ❌ |
| POST | `/api/auth/reset-password` | Reset password with token | ❌ |

### Resume Routes (`/api/resume`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/resume/upload` | Upload and parse resume | ✅ |
| GET | `/api/resume/history` | Get all resume versions | ✅ |
| GET | `/api/resume/:id` | Get specific resume details | ✅ |
| DELETE | `/api/resume/:id` | Delete a resume version | ✅ |

### ATS Routes (`/api/ats`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/ats/score` | Analyze resume and return ATS score | ✅ |
| GET | `/api/ats/score/:resumeId` | Get cached score for a resume | ✅ |
| GET | `/api/ats/history` | Get score history for charts | ✅ |

### Job Routes (`/api/jobs`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/jobs/match` | Get job recommendations for a resume | ✅ |
| GET | `/api/jobs/filters` | Get available filter options | ✅ |

### Career Routes (`/api/career`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/career/recommend` | Get career path recommendations | ✅ |

### AI Routes (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/ai/rewrite` | Rewrite a resume bullet/section | ✅ |
| POST | `/api/ai/target` | Target resume to a job description | ✅ |



---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (bcrypt hash),
  avatar: String (URL),
  careerPreferences: {
    targetRole: String,
    industry: String,
    experienceLevel: String,
    location: String
  },
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Resumes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  fileName: String,
  fileType: String (pdf/docx),
  rawText: String,
  parsedSections: {
    contact: { name, email, phone, linkedin },
    education: [{ institution, degree, year, gpa }],
    experience: [{ company, role, duration, bullets }],
    skills: [String],
    projects: [{ name, description, tech }],
    certifications: [String]
  },
  version: Number,
  uploadedAt: Date
}
```

### Analyses Collection
```javascript
{
  _id: ObjectId,
  resumeId: ObjectId (ref: Resumes),
  userId: ObjectId (ref: Users),
  overallScore: Number (0-100),
  categoryScores: {
    impact: { score: Number, maxScore: 25, details: [...] },
    skills: { score: Number, maxScore: 25, details: [...] },
    structure: { score: Number, maxScore: 20, details: [...] },
    experience: { score: Number, maxScore: 20, details: [...] },
    atsCompat: { score: Number, maxScore: 10, details: [...] }
  },
  lineFeedback: [{
    line: String,
    status: String (strong/needs_improvement/weak),
    issues: [String],
    suggestion: String,
    aiRewrite: String
  }],
  suggestions: [String],
  analyzedAt: Date
}
```

---

## 🚀 Deployment Strategy

### Backend: Render (Free Tier) or Railway
- **Runtime:** Node.js 20
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/app.js`
- **Environment Variables:** `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`

### Frontend: Vercel (Free Tier)
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** `VITE_API_URL` = backend URL

### Database: MongoDB Atlas (Free Tier)
- **Cluster:** M0 (512MB storage, shared)
- **Region:** Mumbai (closest to India-based users)

---


### Pre-Launch Checklist
- [ ] All API endpoints return expected responses
- [ ] Auth flow works end-to-end (register → login → protected route)
- [ ] Resume upload works for PDF, DOC, DOCX
- [ ] ATS scoring returns consistent results
- [ ] JD targeting correctly identifies missing keywords
- [ ] AI rewriting produces meaningful improvements
- [ ] Dashboard charts render correctly
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Error states are handled gracefully
- [ ] Loading states don't cause layout shifts
- [ ] MongoDB Atlas connection is stable
- [ ] CORS is configured for production domains
- [ ] Rate limiting prevents abuse
- [ ] JWT refresh flow works seamlessly

---

## 📝 Notes for Each Team Member

### For Akshat & Anant
- Start with backend setup (B1-B3) and auth. Everything depends on this.
- Use TypeScript strictly — no `any` types in production code.
- Write API tests as you build each endpoint.
- Coordinate on who takes which backend service vs which frontend page.
- Use the shared `types/` directory for request/response types used by both frontend and backend.

### For Mahek (Start after March 5, will give us buffer time to setup the project )

- Your pages are **content-heavy** — invest time in writing quality copy.
- The About page is your showcase — make the CodeSage connection feel natural, not forced.
- For the Career Path visualization, look at libraries like `react-flow` or even a custom SVG approach.
- Your FAQ content should be **genuinely helpful**. Research common resume/ATS questions and write thorough answers.
- The testimonials on the landing page should feel realistic — use names, roles, and specific outcomes.
- For the Dashboard Info Section, think of it as a "career tips feed" that updates daily (can be hardcoded initially).
- **Brainstorm creative ways to link JobTune and CodeSage.** Some ideas:
  - "Your code speaks volumes — but does your resume?" (tagline)
  - Combined developer profile: code quality score + resume score
  - Blog articles connecting coding skills to career growth
  - "Built by the same team that reviews millions of lines of code"

---

> **This document should be the single source of truth for the entire team. If something is unclear, update this document — don't create side channels of information. Every feature, every page, every task is listed here. No surprises, contact for any confusion.**

