from backend.server.extensions import db
from app import create_app
from models.charity import Charity
from models.donor import Donor
from models.beneficiary import Beneficiary
from models.donation import Donation
from models.inventory import InventoryItem
from models.charityApplications import CharityApplication
from models.charityStory import Story
from models.admin import Admin
import datetime
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    print("Dropping and recreating all tables...")
    db.drop_all()
    db.create_all()

    # Create admin first
    admin1 = Admin(
        name="Review Admin",
        email="admin@example.com",
        password_hash=generate_password_hash("adm1n123")
    )
    db.session.add(admin1)
    db.session.commit()

    # Sample charities with approved_at
    charity1 = Charity(
        name="Hope Foundation",
        description="Supports education for girls",
        email="hope@example.com",
        password_hash=generate_password_hash("adm1n123"),
        approved_at=datetime.datetime.utcnow()
    )
    charity2 = Charity(
        name="Green Earth",
        description="Focuses on environmental sustainability",
        email="green@example.com",
        password_hash=generate_password_hash("adm1n123"),
        approved_at=datetime.datetime.utcnow()
    )

    # Sample donors
    donor1 = Donor(
        name="Alice Muthoni",
        email="alice@example.com",
        password_hash=generate_password_hash("adm1n123")
    )
    donor2 = Donor(
        name="John Ouma",
        email="john@example.com",
        password_hash=generate_password_hash("adm1n123")
    )

    # Sample beneficiaries
    beneficiary1 = Beneficiary(name="Mary Atieno", location="West Pokot", charity=charity1)
    beneficiary2 = Beneficiary(name="Peter Kimani", location="Maralal", charity=charity2)

    # Sample donations with extras
    donation1 = Donation(
        donor=donor1,
        charity=charity1,
        amount=500,
        payment_method="mpesa",
        donation_date=datetime.datetime.utcnow(),
        is_anonymous=False,
        is_recurring=True,
        frequency="monthly",
        transaction_reference="TXN123ABC",
        reminder_sent=True
    )
    donation2 = Donation(
        donor=donor2,
        charity=charity2,
        amount=1000,
        payment_method="mpesa",
        donation_date=datetime.datetime.utcnow(),
        is_anonymous=True,
        is_recurring=False,
        frequency=None,
        transaction_reference="TXN456XYZ",
        reminder_sent=False
    )

    # Sample inventory items
    item1 = InventoryItem(
        item_name="Sanitary Pads",
        amount=200,
        sent_date=str(datetime.date.today()),
        beneficiary=beneficiary1,
        charity=charity1
    )
    item2 = InventoryItem(
        item_name="Reusable Water Bottles",
        amount=100,
        sent_date=str(datetime.date.today()),
        beneficiary=beneficiary2,
        charity=charity2
    )

    # Charity applications
    application1 = CharityApplication(
        charity_name="Bright Minds",
        email="bright@example.com",
        password_hash=generate_password_hash("adm1n123"),
        description="Mentorship for teens",
        submitted_at=datetime.datetime.utcnow(),
        status="pending",
        reviewed_by=admin1.id
    )
    application2 = CharityApplication(
        charity_name="Clean Kenya",
        email="clean@example.com",
        password_hash=generate_password_hash("adm1n123"),
        description="Water projects",
        submitted_at=datetime.datetime.utcnow(),
        status="approved",
        reviewed_by=admin1.id
    )

    # Stories 

    # Add everything to the session
    db.session.add_all([
        charity1, charity2,
        donor1, donor2,
        beneficiary1, beneficiary2,
        donation1, donation2,
        item1, item2,
        application1, application2
    ])
    db.session.commit()

    print("✅ All test data seeded successfully!")
