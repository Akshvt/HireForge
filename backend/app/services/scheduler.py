from apscheduler.schedulers.background import BackgroundScheduler
from app.services.daily_job_updater import update_job_dates

def start_scheduler():
    scheduler = BackgroundScheduler()

    # Run once immediately (important)
    scheduler.add_job(update_job_dates, "date")

    # Then run every 24 hours
    scheduler.add_job(
        update_job_dates,
        trigger="interval",
        hours=24,
        id="job_date_updater",
        replace_existing=True
    )

    scheduler.start()
    print("🕒 Job update scheduler started")
