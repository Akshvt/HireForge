from fastapi import APIRouter
from app.services.career_recommender import recommend_career

router = APIRouter()

@router.post("/recommend")
def career_recommend(data: dict):
    return recommend_career(data.get("skills", []))
