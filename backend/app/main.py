from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import resume_routes, job_routes, ats_routes
from app.services.scheduler import start_scheduler
from app.api import career_routes



app = FastAPI(title="AI Resume Analyzer & Job Matcher")

# ---------------- START BACKGROUND SCHEDULER ----------------
@app.on_event("startup")
def startup_event():
    start_scheduler()


# ---------------- ROUTES ----------------
app.include_router(resume_routes.router, prefix="/resume", tags=["Resume"])
app.include_router(job_routes.router, prefix="/jobs", tags=["Jobs"])
app.include_router(ats_routes.router, prefix="/ats", tags=["ATS"])
app.include_router(career_routes.router, prefix="/career", tags=["Career"])


# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- HEALTH CHECK ----------------
@app.get("/")
def home():
    return {"message": "API is running successfully"}
