import re

SKILLS_DB = [
    "python", "java", "sql", "machine learning", "deep learning",
    "flask", "fastapi", "react", "node", "docker", "aws", "git",
    "linux", "devops", "cloud"
]

def extract_experience(text: str) -> int:
    """
    Extract experience in years using regex
    """
    matches = re.findall(r"(\d+)\+?\s*(years?|yrs?)", text.lower())
    if matches:
        return max(int(m[0]) for m in matches)
    return 0

def parse_resume(text: str):
    text_lower = text.lower()

    skills = [skill for skill in SKILLS_DB if skill in text_lower]
    experience_years = extract_experience(text)

    return {
        "skills": list(set(skills)),
        "experience": experience_years,
        "resume_text": text
    }
