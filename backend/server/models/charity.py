from extensions import db 
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash


class Charity(db.Model, SerializerMixin):
    __tablename__ = "charities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text)
    approved_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    stories = db.relationship('Story', back_populates='charity', cascade='all, delete-orphan')
    beneficiaries = db.relationship('Beneficiary', back_populates='charity', cascade='all, delete-orphan')
    inventory_items = db.relationship('InventoryItem', back_populates='charity', cascade='all, delete-orphan')
    donations = db.relationship("Donation", back_populates="charity", cascade='all, delete' )


    serialize_rules = ('-beneficiaries.charity', 
                        '-stories', 
                        '-inventory_items.charity', 
                        '-donations.charity',
                        )
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    

    # Serialization rules
   

    def __repr__(self):
        return f'<Charity {self.name}>'