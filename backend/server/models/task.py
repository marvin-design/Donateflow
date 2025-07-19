from flask_mail import Message
from app import mail, db
from datetime import datetime, timedelta
from models.donation import Donation

def send_donation_reminder():
    today = datetime.utcnow()

   
    donations = Donation.query.filter(
        Donation.is_recurring == True,
        Donation.reminder_sent == False
    ).all()

    for donation in donations:
        donor = donation.donor
        charity = donation.charity

   
        if donation.frequency == 'weekly':
            interval = timedelta(days=7)
        elif donation.frequency == 'monthly':
            interval = timedelta(days=30)
        else:
           
            continue

       
        if donation.donation_date < (today - interval):
            if donor and donor.email:
                msg = Message(
                    subject='Donation Reminder',
                    recipients=[donor.email],
                    body=(
                        f"Dear {donor.name},\n\n"
                        f"This is a reminder for your donation of {donation.amount} "
                        f"to {charity.name}.\n\n"
                        f"Click here to donate again: https://yourdomain.com/charities/{charity.id}\n\n"#after creation of charity routes it should be updated
                        "Thank you for your generosity!\n\nBest regards,\nDonateFlow Team"
                    )
                )

                try:
                    mail.send(msg)
                    donation.reminder_sent = True
                    db.session.commit()
                    print(f"Reminder email sent to {donor.email} for donation {donation.id}")
                except Exception as e:
                    print(f"Failed to send email to {donor.email}: {e}")

def scheduler_reminder_job(app): # This function registers the job in the flask application 
    app.apscheduler.add_job( # =>registers the job in the APScheduler 
        id='send_donation_reminder',
        func=send_donation_reminder,
        trigger='interval',
        days=1,
    )
