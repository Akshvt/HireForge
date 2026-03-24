from pydantic import BaseModel
from typing import List

class JobRecommendRequest(BaseModel):
    resume_text: str
    skills: List[str]
    experience: int

class ATSRequest(BaseModel):
    resume: dict
    

class CareerRequest(BaseModel):
    skills: List[str]
