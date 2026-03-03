from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.services.ats_scorer import analyze_resume
from app.services.ats_fixer import apply_fixes
from app.services.pdf_exporter import generate_resume_pdf
from app.services.ai_rewriter import rewrite_line_hf

router = APIRouter()


@router.post("/score")
def ats_score(payload: dict):
    resume_text = payload.get("resume_text", "")
    skills = payload.get("skills", [])
    experience = payload.get("experience", 0)

    if not resume_text or len(resume_text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty or too short"
        )

    return analyze_resume(resume_text, skills, experience)


@router.post("/apply-fixes")
def apply_ats_fixes(payload: dict):
    resume_text = payload.get("resume_text", "")
    feedback = payload.get("feedback", [])

    if not resume_text:
        raise HTTPException(status_code=400, detail="Resume text missing")

    return {
        "improved_resume": apply_fixes(resume_text, feedback)
    }


@router.post("/export-pdf")
def export_pdf(payload: dict):
    resume_text = payload.get("resume_text", "")

    if not resume_text:
        raise HTTPException(status_code=400, detail="Resume text missing")

    pdf_stream = generate_resume_pdf(resume_text)

    return StreamingResponse(
        pdf_stream,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=improved_resume.pdf"
        }
    )


@router.post("/ai-rewrite")
def ai_rewrite(payload: dict):
    line = payload.get("line", "")

    if not line.strip():
        raise HTTPException(status_code=400, detail="Line text missing")

    return {
        "rewritten": rewrite_line_hf(line)
    }
