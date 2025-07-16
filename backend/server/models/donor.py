from app import db, ma
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # Plain text password
    is_admin = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    
    # Relationships
    donations = db.relationship('Donation', backref='donor', lazy=True)

    # Required for Flask-Login (UserMixin already covers these, but explicit is clearer)
    def is_authenticated(self):
        return True  # Assume all users are authenticated if they exist
    
    def is_active(self):
        return True  # No account deactivation logic
    
    def get_id(self):
        return str(self.id)  # Must return a string

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        exclude = ('password',)  # Hide password in serialized output

    id = ma.auto_field()
    username = ma.auto_field()
    email = ma.auto_field()
    is_admin = ma.auto_field()
    created_at = ma.auto_field()