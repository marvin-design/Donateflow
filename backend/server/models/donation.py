from app import db, ma

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String(20))  # 'monthly', 'weekly', etc.
    payment_method = db.Column(db.String(50))  # 'stripe', 'paypal'
    transaction_id = db.Column(db.String(100))
    is_anonymous = db.Column(db.Boolean, default=False)
    donation_date = db.Column(db.DateTime, default=db.func.now())

