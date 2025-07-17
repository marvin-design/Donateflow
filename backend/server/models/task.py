from flask_mail import Message
from app import mail, db
from datetime import datetime,timedelta

from models.donation import Donation

def send_donation_reminder(donor, donation):

    today = datetime.utcnow()
    interval =today- timedelta(days=30)  

    donations = Donation.query.filter(
        Donation.reminder_sent == False,
        Donation.donation_date < interval
    ).all()


    for donation in donations:
        donor= donation.donor
        charity = donation.charity
        if donor and donor.email:
            msg = Message(
                subject=f'Donation Reminder', 
                recipients=[donor.email],
                body=(f'Dear {donor.name},\n\nThis is a reminder for your donation of {donation.amount} to {charity.name} .\n\n f"Click here to donate again: https://yourdomain.com/charities/{charity.id}\n\n"Thank you for your generosity!\n\nBest regards,\nDonateFlow Team'   )
            )

            try:
                mail.send(msg)
                donation.reminder_sent = True
                db.session.commit()
                print(f"Reminder email sent to {donor.email} for donation {donation.id}")
            except Exception as e:
                print(f"Failed to send email to {donor.email}: {e}")
                # Optionally, you can log the error or handle it as needed

       