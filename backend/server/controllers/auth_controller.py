from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime
from extensions import db
from models.donor import Donor
from models.charity import Charity
from models.admin import Admin

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    role = data.get('role')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([role, email, password]):
        return jsonify({"error": "role, email, and password are required"}), 400

    hashed_pw = generate_password_hash(password)

    if role == "donor":
        if Donor.query.filter_by(email=email).first():
            return jsonify({"error": "Donor email already registered"}), 409
        donor = Donor(name=name, email=email, password_hash=hashed_pw, created_at=datetime.utcnow())
        db.session.add(donor)
        db.session.commit()
        token = create_access_token(identity=donor.id, additional_claims={"role": "donor"})
        return jsonify({"access_token": token, "user_id": donor.id, "role": "donor", "name": donor.name}), 201

    elif role == "charity":
        if Charity.query.filter_by(email=email).first():
            return jsonify({"error": "Charity email already registered"}), 409
        charity = Charity(name=name, email=email, password_hash=hashed_pw, created_at=datetime.utcnow(), approved_at=None)
        db.session.add(charity)
        db.session.commit()
        return jsonify({"msg": "Charity application submitted. Awaiting approval."}), 201

    elif role == "admin":
        if Admin.query.filter_by(email=email).first():
            return jsonify({"error": "Admin email already registered"}), 409
        admin = Admin(name=name, email=email, password_hash=hashed_pw)
        db.session.add(admin)
        db.session.commit()
        token = create_access_token(identity=admin.id, additional_claims={"role": "admin"})
        return jsonify({"access_token": token, "user_id": admin.id, "role": "admin", "name": admin.name}), 201

    else:
        return jsonify({"error": "Invalid role"}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not all([role, email, password]):
        return jsonify({"error": "role, email, and password are required"}), 400

    if role == "donor":
        user = Donor.query.filter_by(email=email).first()
    elif role == "charity":
        user = Charity.query.filter_by(email=email).first()
        if user and user.approved_at is None:
            return jsonify({"error": "Charity not approved yet"}), 403
    elif role == "admin":
        user = Admin.query.filter_by(email=email).first()
    else:
        return jsonify({"error": "Invalid role"}), 400

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id, additional_claims={"role": role})
    return jsonify({
        "access_token": token,
        "user_id": user.id,
        "role": role,
        "name": getattr(user, "name", "")
    }), 200
