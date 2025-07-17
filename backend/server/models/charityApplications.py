from app import db

class CharityApplication(db.Model):
    __tablename__='charity_applications'


    id=db.Column(db.Integer, primary_key=True)
    charity_name=db.Column(db.String(150), nullable=False)
    email=db.Column(db.String(100), unique=True, nullable=False)
    description=db.Column(db.Text, nullable=False)
    submitted_at=db.Column(db.DateTime, nullable=False)
    status=db.Column(db.String(50), default='pending', nullable=False)
    reviewed_by=db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=False)

    admin = db.relationship('Admin', back_populates='charityapplications')


    def __repr__(self):
        return f'<CharityApplication {self.charity_name} - {self.email} - {self.status}>'

