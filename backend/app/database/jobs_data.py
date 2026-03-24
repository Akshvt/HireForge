import pandas as pd
from app.utils.preprocessing import clean_text

JOBS_FILE = "datasets/jobs.csv"

def load_jobs():
    """
    Load jobs dataset and preprocess text
    """
    df = pd.read_csv(JOBS_FILE)

    # Clean descriptions
    df["clean_description"] = df["description"].apply(clean_text)

    # Convert skills column into list
    df["skills"] = df["skills"].apply(
        lambda x: [skill.strip().lower() for skill in x.split(",")]
    )

    return df
