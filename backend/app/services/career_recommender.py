# ==========================================================
# LEARNING RESOURCES (MULTI-PLATFORM)
# ==========================================================

LEARNING_LINKS = {
    "python": {
        "youtube": "https://www.youtube.com/results?search_query=python+programming",
        "coursera": "https://www.coursera.org/specializations/python",
        "udemy": "https://www.udemy.com/course/complete-python-bootcamp/",
        "gfg": "https://www.geeksforgeeks.org/python-programming-language/",
        "w3schools": "https://www.w3schools.com/python/"
    },
    "java": {
        "youtube": "https://www.youtube.com/results?search_query=java+tutorial",
        "coursera": "https://www.coursera.org/specializations/java-programming",
        "udemy": "https://www.udemy.com/course/java-the-complete-java-developer-course/",
        "gfg": "https://www.geeksforgeeks.org/java/",
        "w3schools": "https://www.w3schools.com/java/"
    },
    "sql": {
        "youtube": "https://www.youtube.com/results?search_query=sql+tutorial",
        "coursera": "https://www.coursera.org/learn/sql-for-data-science",
        "udemy": "https://www.udemy.com/course/the-complete-sql-bootcamp/",
        "gfg": "https://www.geeksforgeeks.org/sql-tutorial/",
        "w3schools": "https://www.w3schools.com/sql/"
    },
    "flask": {
        "youtube": "https://www.youtube.com/results?search_query=flask+tutorial",
        "coursera": "https://www.coursera.org/projects/flask-web-development",
        "udemy": "https://www.udemy.com/course/flask-tutorial/",
        "gfg": "https://www.geeksforgeeks.org/flask-tutorial/",
        "w3schools": "https://www.w3schools.com/python/python_flask.asp"
    },
    "machine learning": {
        "youtube": "https://www.youtube.com/results?search_query=machine+learning+tutorial",
        "coursera": "https://www.coursera.org/learn/machine-learning",
        "udemy": "https://www.udemy.com/course/machinelearning/",
        "gfg": "https://www.geeksforgeeks.org/machine-learning/",
        "w3schools": "https://www.w3schools.com/python/python_ml_getting_started.asp"
    },
    "react": {
        "youtube": "https://www.youtube.com/results?search_query=react+js+tutorial",
        "coursera": "https://www.coursera.org/projects/react-basic",
        "udemy": "https://www.udemy.com/course/react-the-complete-guide/",
        "gfg": "https://www.geeksforgeeks.org/reactjs-tutorials/",
        "w3schools": "https://www.w3schools.com/react/"
    },
    "excel": {
        "youtube": "https://www.youtube.com/results?search_query=excel+tutorial",
        "coursera": "https://www.coursera.org/learn/excel",
        "udemy": "https://www.udemy.com/course/microsoft-excel-excel-from-beginner-to-advanced/",
        "gfg": "https://www.geeksforgeeks.org/microsoft-excel/",
        "w3schools": "https://www.w3schools.com/excel/"
    },
    "communication": {
        "youtube": "https://www.youtube.com/results?search_query=communication+skills",
        "coursera": "https://www.coursera.org/learn/communication-skills",
        "udemy": "https://www.udemy.com/course/communication-skills-for-beginners/",
        "gfg": "https://www.geeksforgeeks.org/communication-skills/",
        "w3schools": "https://www.w3schools.com/career/career_soft_skills.asp"
    }
}


# ==========================================================
# CAREER PATH DEFINITIONS (TECH & NON-TECH)
# ==========================================================

CAREER_PATHS = {
    "Software Engineer": {
        "category": "Tech",
        "required": ["python", "sql", "git"],
        "next": "Senior Software Engineer"
    },
    "Backend Developer": {
        "category": "Tech",
        "required": ["python", "sql", "flask"],
        "next": "Senior Backend Engineer"
    },
    "Machine Learning Engineer": {
        "category": "Tech",
        "required": ["python", "machine learning"],
        "next": "Senior ML Engineer"
    },
    "Frontend Developer": {
        "category": "Tech",
        "required": ["react", "javascript"],
        "next": "UI Architect"
    },
    "DevOps Engineer": {
        "category": "Tech",
        "required": ["docker", "aws"],
        "next": "DevOps Lead"
    },
    "Data Analyst": {
        "category": "Non-Tech",
        "required": ["python", "sql", "excel"],
        "next": "Senior Data Analyst"
    },
    "Business Analyst": {
        "category": "Non-Tech",
        "required": ["sql", "excel", "communication"],
        "next": "Business Consultant"
    },
    "Product Analyst": {
        "category": "Non-Tech",
        "required": ["sql", "excel", "analytics"],
        "next": "Product Manager"
    },
    "Operations Executive": {
        "category": "Non-Tech",
        "required": ["communication", "documentation"],
        "next": "Operations Manager"
    },
    "HR Executive": {
        "category": "Non-Tech",
        "required": ["communication", "recruitment"],
        "next": "HR Manager"
    }
}


# ==========================================================
# MAIN CAREER RECOMMENDER
# ==========================================================

def recommend_career(resume_skills: list):
    resume_skills = set(map(str.lower, resume_skills))

    tech_paths = []
    non_tech_paths = []

    # Rank all paths
    for role, data in CAREER_PATHS.items():
        required = set(data["required"])
        matched = len(resume_skills & required)

        if matched > 0:
            missing = list(required - resume_skills)

            path_data = {
                "current_role": role,
                "category": data["category"],
                "next_role": data["next"],
                "match_score": matched,
                "missing_skills": missing,
                "learning_resources": {
                    skill: LEARNING_LINKS.get(skill, {})
                    for skill in missing
                }
            }

            if data["category"] == "Tech":
                tech_paths.append(path_data)
            else:
                non_tech_paths.append(path_data)

    # Sort by best match
    tech_paths.sort(key=lambda x: x["match_score"], reverse=True)
    non_tech_paths.sort(key=lambda x: x["match_score"], reverse=True)

    # Default fallback for freshers
    if not tech_paths and not non_tech_paths:
        tech_paths.append({
            "current_role": "Software Engineer",
            "category": "Tech",
            "next_role": "Specialist Engineer",
            "match_score": 0,
            "missing_skills": ["system design", "cloud", "data structures"],
            "learning_resources": {}
        })

    return {
        "primary_path": tech_paths[0] if tech_paths else non_tech_paths[0],
        "tech_paths": tech_paths,
        "non_tech_paths": non_tech_paths
    }
