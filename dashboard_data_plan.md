# Implementation Plan - Dynamic Dashboard Data

Replace mocked dashboard metrics with actual data from the backend.

## Proposed Changes

### Backend (Node.js)

#### [MODIFY] [atsScoringEngine.ts](file:///c:/My%20Projects/HireForge/backend-node/src/utils/atsScoringEngine.ts)
- Update `calculateATSScore` to perform basic keyword/skill extraction.
- Reduce randomness in scoring to make it data-driven.

#### [MODIFY] [resume.controller.ts](file:///c:/My%20Projects/HireForge/backend-node/src/controllers/resume.controller.ts)
- Update `uploadResume` to calculate and save `atsScore` and `skills` during upload.
- Add `getDashboardStats` to return `totalResumes`, `averageAts`, `jobMatchesCount`, and `aiRewritesCount`.

#### [MODIFY] [resume.routes.ts](file:///c:/My%20Projects/HireForge/backend-node/src/routes/resume.routes.ts)
- Register `GET /stats`.

### Frontend (React)

#### [MODIFY] [Dashboard.tsx](file:///c:/My%20Projects/HireForge/frontend/src/pages/Dashboard.tsx)
- Add `useEffect` to fetch stats from `/api/resumes/stats`.
- Replace mocked `stats` array with fetched data.

## Verification Plan

### Automated Tests
- Test the new stats endpoint.
- Verify that resume uploads correctly update stats.

### Manual Verification
1. Login and upload a resume.
2. Confirm metrics like `totalResumes` and `averageATS` are correctly displayed on the dashboard.
