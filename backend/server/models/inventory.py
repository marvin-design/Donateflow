from sqlalchemy.orm import relationship
from app import db
from backend.server.models.beneficiary import Beneficiary

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    sent_date = timestamp = db.Column(db.String(50), nullable=False)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)

    beneficiary = relationship("Beneficiary", back_populates="inventory_items")
    charity = relationship("Charity", back_populates="inventory_items")

    def __repr__(self):
        return f"<InventoryItem(id={self.id}, item_name={self.item_name}, amount={self.amount})>"