from sqlalchemy_serializer import SerializerMixin
from extensions import db 

class InventoryItem(db.Model, SerializerMixin):
    __tablename__ = 'inventory_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    sent_date = db.Column(db.String(50), nullable=False)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)

    beneficiary = db.relationship("Beneficiary", back_populates="inventory_items")
    charity = db.relationship("Charity", back_populates="inventory_items")

    # Serialization
    serialize_rules = ('-beneficiary.inventory_items', '-charity.inventory_items',)

    def __repr__(self):
        return f"<InventoryItem(id={self.id}, item_name={self.item_name}, amount={self.amount})>"