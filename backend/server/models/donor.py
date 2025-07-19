from app import db
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash

class Donor(db.Model, SerializerMixin):
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False) 
    is_anonymous = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    donations = db.relationship('Donation', backref='donor', lazy=True)

    serialize_rules = ('-password_hash', '-donations.donor',)


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash,password)
    
    def __repr__(self):
        return f'<Donor: {self.name}>'
    

    