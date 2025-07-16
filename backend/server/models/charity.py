from app import db
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

class Charity(db.Model, SerializerMixin):
    __tablename__ = "charities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String, nullable = False)
    description = db.Column(db.Text)
    approved_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    stories = db.relationship('Story', back_populates='charity', cascade='all, delete-orphan')
    

    # Serialization rules
    serialize_rules = ('-stories_charity',)

    def __repr__(self):
        return f'<Charity {self.name}>'