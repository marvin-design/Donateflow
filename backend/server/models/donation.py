from app import db
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

class Donation(db.Model, SerializerMixin):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    
    # Relationships (with explicit foreign_keys)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=True)  # Nullable for guest donations
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    # Donation details
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String(20))  # 'monthly', 'weekly', etc.
    
    # Payment information
    payment_method = db.Column(db.String(50))  # 'stripe', 'paypal', 'mpesa'
    transaction_reference = db.Column(db.String(100))  # For payment provider reference
    
    # Timestamps and status
    donation_date = db.Column(db.DateTime, default=datetime.utcnow)
    reminder_sent = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)  # Added from requirements
    
    # Relationships configuration
    donor = db.relationship('Donor', back_populates='donations', foreign_keys=[donor_id])
    charity = db.relationship('Charity', back_populates='donations', foreign_keys=[charity_id])

    # Serialization rules to avoid circular references
    serialize_rules = (
        '-donor.donations', 
        '-charity.donations',
        '-donor.charities',
        '-charity.donors'
    )

    def __repr__(self):
        donor_info = f'Donor {self.donor_id}' if self.donor_id else 'Guest Donor'
        return f'<Donation {self.amount} by {donor_info} to Charity {self.charity_id}>'