from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
from backend.server.models.charity import Charity

class Beneficiary(Base):
    __tablename__ = 'beneficiaries'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    charity_id = Column(Integer, ForeignKey('charities.id'), nullable=False)

    charity = relationship("Charity", back_populates="beneficiaries")
    inventory_items = relationship("InventoryItem", back_populates="beneficiary")

    def __repr__(self):
        return f"<Beneficiary(id={self.id}, name={self.name}, location={self.location})>"