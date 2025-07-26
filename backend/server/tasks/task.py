from flask_mail import Message
from datetime import datetime, timedelta
from models.donation import Donation
from extensions import db, mail

def send_donation_reminder(app):
    with app.app_context():
        today = datetime.utcnow()

        donations = Donation.query.filter(
            Donation.is_recurring == True,
            Donation.reminder_sent == False
        ).all()

        for donation in donations:
            donor = donation.donor
            charity = donation.charity

            # Set donation frequency interval
            if donation.frequency == 'weekly':
                interval = timedelta(days=7)
            elif donation.frequency == 'monthly':
                interval = timedelta(days=30)
            else:
                continue  # Skip unknown frequencies

            # Check if a reminder should be sent
            if donation.donation_date < (today - interval):
                if donor and donor.email:
                    msg = Message(
                        subject='Donation Reminder',
                        recipients=[donor.email],
                        body=(
                            f"Dear {donor.name},\n\n"
                            f"This is a reminder for your donation of KES {donation.amount} "
                            f"to {charity.name}.\n\n"
                            f"Click here to donate again: https://yourdomain.com/charities/{charity.id}\n\n"
                            "Thank you for your generosity!\n\nBest regards,\nDonateFlow Team"
                        )
                    )

                    try:
                        mail.send(msg)
                        donation.reminder_sent = True
                        db.session.commit()
                        print(f"[✔] Reminder sent to {donor.email} for donation #{donation.id}")
                    except Exception as e:
                        print(f"[✖] Failed to send email to {donor.email}: {e}")

def scheduler_reminder_job(app):
    app.apscheduler.add_job(
        id='send_donation_reminder',
        func=lambda: send_donation_reminder(app),
        trigger='interval',
        days=1,
        replace_existing=True
    )
