import pandas as pd
from pathlib import Path
from urllib.parse import quote_plus

JOBS_FILE = Path("datasets/jobs.csv")

# 🔗 Role → Search keyword mapping
ROLE_KEYWORDS = {
    "software engineer": "software engineer",
    "frontend": "frontend developer",
    "backend": "backend developer",
    "full stack": "full stack developer",
    "machine learning": "machine learning engineer",
    "data analyst": "data analyst",
    "data scientist": "data scientist",
    "devops": "devops engineer",
    "qa": "qa engineer",
    "tester": "software tester",
    "business analyst": "business analyst",
    "product analyst": "product analyst",
    "hr": "hr executive",
    "operations": "operations executive",
}

def build_links(title: str, job_type: str):
    title_lower = title.lower()

    keyword = "software jobs"
    for key, value in ROLE_KEYWORDS.items():
        if key in title_lower:
            keyword = value
            break

    if job_type == "INTERNSHIP":
        keyword += " internship"
    else:
        keyword += " fresher"

    q = quote_plus(keyword)

    linkedin = (
        f"https://www.linkedin.com/jobs/search/"
        f"?keywords={q}&location=India"
    )

    naukri = f"https://www.naukri.com/{q.replace('+', '-')}-jobs"

    return linkedin, naukri


def recommend_jobs(resume_text: str, resume_skills: list, experience: int):
    if not JOBS_FILE.exists():
        print("❌ jobs.csv not found:", JOBS_FILE.resolve())
        return []

    df = pd.read_csv(JOBS_FILE)

    resume_skills = set(s.lower() for s in resume_skills)
    recommendations = []

    for _, row in df.iterrows():
        job_skills = set(
            skill.strip().lower()
            for skill in str(row["skills"]).split(",")
        )

        matched_skills = resume_skills & job_skills
        if not matched_skills:
            continue

        title = row["title"]
        is_intern = "intern" in title.lower()
        job_type = "INTERNSHIP" if is_intern else "FRESHER"

        score = min(100, len(matched_skills) * 20)

        linkedin, naukri = build_links(title, job_type)

        recommendations.append({
            "title": title,
            "job_type": job_type,
            "experience_level": "0-2 years",
            "skills": list(job_skills),
            "final_score": score,
            "linkedin_link": linkedin,
            "naukri_link": naukri,
        })

    return sorted(
        recommendations,
        key=lambda x: x["final_score"],
        reverse=True
    )
