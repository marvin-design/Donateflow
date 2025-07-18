from app import db
from werkzeug.security import generate_password_hash

class CharityApplication(db.Model):
    __tablename__='charity_applications'


    id=db.Column(db.Integer, primary_key=True)
    charity_name=db.Column(db.String(150), nullable=False)
    email=db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    description=db.Column(db.Text, nullable=False)
    submitted_at=db.Column(db.DateTime, nullable=False)
    status=db.Column(db.    String(50), default='pending', nullable=False)
    reviewed_by=db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=False)

    admin = db.relationship('Admin', back_populates='charityapplications')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


    def __repr__(self):
        return f'<CharityApplication {self.charity_name} - {self.email} - {self.status}>'

