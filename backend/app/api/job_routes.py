from fastapi import APIRouter
from app.api.schemas import JobRecommendRequest
from app.services.job_matcher import recommend_jobs

router = APIRouter()

@router.post("/recommend")
def recommend_jobs_api(request: JobRecommendRequest):
    jobs = recommend_jobs(
        resume_text=request.resume_text,
        resume_skills=request.skills or [],
        experience=request.experience or 0
    )

    return {"recommended_jobs": jobs}
