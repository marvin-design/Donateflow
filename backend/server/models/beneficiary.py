from sqlalchemy.orm import relationship
from app import db
from backend.server.models.charity import Charity

class Beneficiary(db.Model):
    __tablename__ = 'beneficiaries'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)

    charity = relationship("Charity", back_populates="beneficiaries")
    inventory_items = relationship("InventoryItem", back_populates="beneficiary")

    def __repr__(self):
        return f"<Beneficiary(id={self.id}, name={self.name}, location={self.location})>"