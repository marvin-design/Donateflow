from extensions import db 
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash


class Admin(db.Model, SerializerMixin):
    __tablename__='admins'


    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(100), unique=True, nullable=False)
    password_hash=db.Column(db.String(300), nullable=False)


    charityapplications = db.relationship('CharityApplication', back_populates='admin')
   
    serialize_rules = ('-password_hash', '-charityapplications.admin',)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash(password))


    def __repr__(self):
        return f'<Admin {self.name} - {self.email}>'