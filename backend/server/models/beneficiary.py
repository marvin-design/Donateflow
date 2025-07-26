from extensions import db 
from sqlalchemy_serializer import SerializerMixin



class Beneficiary(db.Model, SerializerMixin):
    __tablename__ = 'beneficiaries'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)

    charity = db.relationship("Charity", back_populates="beneficiaries")
    inventory_items = db.relationship("InventoryItem", back_populates="beneficiary")

    serialize_rules = ('-charity', 
                    '-inventory_items.beneficiary',)

    def __repr__(self):
        return f"<Beneficiary(id={self.id}, name={self.name}, location={self.location})>"