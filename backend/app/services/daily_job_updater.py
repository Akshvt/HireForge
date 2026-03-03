import pandas as pd
from datetime import datetime, timedelta
from pathlib import Path

# ✅ CORRECT PATH
JOBS_FILE = Path("datasets/jobs.csv")

def update_job_dates():
    if not JOBS_FILE.exists():
        print("❌ jobs.csv not found at:", JOBS_FILE.resolve())
        return

    df = pd.read_csv(JOBS_FILE)

    # 🔁 Randomize dates in last 7 days
    today = datetime.now().date()
    df["date_posted"] = [
        (today - timedelta(days=i % 7)).isoformat()
        for i in range(len(df))
    ]

    df.to_csv(JOBS_FILE, index=False)
    print("✅ Job dates refreshed:", datetime.now())
