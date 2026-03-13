# Express Backend Migration Plan

## Goal
Refactor and migrate the existing Python (FastAPI) backend to Node.js (Express) with TypeScript, aligning directly with the **HireForge Project Plan** requirements for the Core Development Team.

## Tasks
- [x] Task 1: Initialize Node.js + Express + TypeScript Project & MongoDB connection → Verify: `npm run dev` starts the server and connects to MongoDB. (Agent: `backend-specialist`, Skill: `nodejs-best-practices`)
- [x] Task 2: Implement Auth System (User model, JWT, bcrypt) → Verify: Can register, login, and access protected route via API endpoints.
- [x] Task 3: Implement Resume Upload & Parsing (Multer, pdf-parse, mammoth) → Verify: File upload correctly extracts and structure text into MongoDB.
- [x] Task 4: Implement ATS Scoring Engine (20+ parameters) → Verify: Scoring endpoint returns proper category breakdowns and line-by-line feedback.
- [x] Task 5: Implement JD Targeting Service → Verify: Target endpoint successfully compares resume to JD and returns match score and keyword gap analysis.
- [~] Task 6: Implement AI Rewriter Service (Gemini API) → Verify: Rewrite endpoint returns improved resume bullets and alternative tones. [SKIPPED]
- [x] Task 7: Implement Job Matching Engine → Verify: Match endpoint returns filtered/sorted job recommendations from MongoDB based on skills.
- [x] Task 8: Implement PDF Export & Resume Version History → Verify: Can download PDF of improved resume and view previous resume versions.
- [x] Task 9: Rate Limiting, CORS, & Security Hardening → Verify: Helmet and rate limiter middleware are active and correctly blocking abuse.
- [x] Task 10: Run Verification Scripts (Security & Linting) → Verify: `npm run lint`, TypeScript checks, and `.agent/skills/vulnerability-scanner/scripts/security_scan.py` pass clean.

## Done When
- [ ] The Express backend completely replaces the FastAPI functionality.
- [ ] All endpoints (Auth, Resume, ATS, JD, AI) return 200 OK or appropriate status codes.
- [ ] Phase X checks pass without errors and the project is ready for frontend integration.
