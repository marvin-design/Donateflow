from extensions import db 
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

class Story(db.Model, SerializerMixin):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text)
    photo_url = db.Column(db.Text)
    posted_at = db.Column(db.DateTime, default = datetime.utcnow )
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    

    # Serialization rules
    serialize_rules = ('-charity_stories',)

    #Relationship
    charity = db.relationship('Charity',back_populates = 'stories' )
    

    def __repr__(self):
        return f'<Story {self.title}>'