from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Metadata


db=SQLAlchemy()
metadata = Metadata()


class Admin(db.Model):
    __tablename__='admins'


    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(100), unique=True, nullable=False)
    password=db.Column(db.String, nullable=False)


    charityapplications = db.relationship('CharityApplication', back_populates='admin')


    def __repr__(self):
        return f'<Admin {self.name} - {self.email}>'