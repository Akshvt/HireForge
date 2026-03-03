from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.utils.text_extractor import extract_text_from_resume
from app.services.resume_parser import parse_resume

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_resume(file_path)
    parsed_data = parse_resume(text)

    return {
        "filename": file.filename,
        "parsed_resume": parsed_data
    }
