from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.server.models.base import Base
from backend.server.models.beneficiary import Beneficiary

class InventoryItem(Base):
    __tablename__ = 'inventory_items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_name = Column(String(100), nullable=False)
    amount = Column(Integer, nullable=False)
    sent_date = timestamp = Column(String(50), nullable=False)
    beneficiary_id = Column(Integer, ForeignKey('beneficiaries.id'), nullable=False)
    charity_id = Column(Integer, ForeignKey('charities.id'), nullable=False)

    beneficiary = relationship("Beneficiary", back_populates="inventory_items")
    charity = relationship("Charity", back_populates="inventory_items")

    def __repr__(self):
        return f"<InventoryItem(id={self.id}, item_name={self.item_name}, amount={self.amount})>"