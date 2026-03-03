ACTION_VERBS = [
    "developed", "built", "designed", "implemented",
    "analyzed", "optimized", "deployed", "led",
    "created", "improved", "managed"
]

def analyze_resume(resume_text: str, skills: list, experience: int):
    text = resume_text.lower()

    score = 0
    suggestions = []
    line_feedback = []

    # ---------- 1. Skills Coverage ----------
    if len(skills) >= 8:
        score += 35
    elif len(skills) >= 6:
        score += 30
        suggestions.append("Add more relevant technical skills")
    elif len(skills) >= 4:
        score += 24
        suggestions.append("Add 2–3 more relevant technical skills")
    else:
        score += 18
        suggestions.append("Your resume lacks sufficient technical skills")

    # ---------- 2. Resume Length ----------
    word_count = len(text.split())
    if 450 <= word_count <= 900:
        score += 20
    elif 300 <= word_count < 450:
        score += 16
        suggestions.append("Increase resume length to ~500 words")
    else:
        score += 12
        suggestions.append("Your resume is too short for ATS systems")

    # ---------- 3. Action Verbs ----------
    verb_hits = sum(1 for v in ACTION_VERBS if v in text)
    if verb_hits >= 5:
        score += 15
    else:
        score += 10
        suggestions.append("Use more action verbs (developed, implemented, optimized)")

    # ---------- 4. Experience ----------
    if experience >= 3:
        score += 20
    elif experience == 2:
        score += 17
    elif experience == 1:
        score += 14
        suggestions.append("Highlight internships or hands-on projects")
    else:
        score += 10
        suggestions.append("Add projects or internship experience")

    # ---------- 5. Formatting ----------
    if "|" not in text and "\t" not in text:
        score += 10
    else:
        score += 7
        suggestions.append("Avoid tables, columns, or special symbols")

    score = min(max(score, 65), 95)

    # ---------- Line-level feedback (simple & safe) ----------
    for line in resume_text.split("\n"):
        if len(line.strip()) < 10:
            continue

        issues = []
        if not any(v in line.lower() for v in ACTION_VERBS):
            issues.append("Line lacks strong action verbs")

        if issues:
            line_feedback.append({
                "line": line,
                "issues": issues,
                "improved_example": f"Improved: {line.strip()} using measurable impact"
            })

    return {
        "ats_score": score,
        "suggestions": list(set(suggestions)),
        "line_feedback": line_feedback
    }
