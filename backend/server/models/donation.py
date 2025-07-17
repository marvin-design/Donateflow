from app import db

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String(20))  # 'monthly', 'weekly', etc.
    payment_method = db.Column(db.String(50))  # 'stripe', 'paypal'
    donation_date = db.Column(db.DateTime, default=db.func.now())
    reminder_sent = db.column(db.Boolean, default=False)

    donor = db.relationship('Donor', back_populates='donations')
    charity = db.relationship('Charity', backref='donations')

    # Serialization
    serialize_rules = ('-donor.donations', '-charity.donations')

    def __repr__(self):
        return f'<Donation{self.amount} by Donor {self.donor_id}>'