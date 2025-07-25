from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime
from extensions import db
from models.donor import Donor
from models.charity import Charity
from models.admin import Admin
import os

auth_bp = Blueprint('auth', __name__)

# === REGISTER ROUTES ===

@auth_bp.route('/register/donor', methods=['POST'])
def register_donor():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Email and password are required"}), 400

    if Donor.query.filter_by(email=email).first():
        return jsonify({"error": "Donor email already registered"}), 409

    donor = Donor(name=name, email=email, password_hash=generate_password_hash(password), created_at=datetime.utcnow())
    db.session.add(donor)
    db.session.commit()

    token = create_access_token(identity=donor.id, additional_claims={"role": "donor"})
    return jsonify({"access_token": token, "user_id": donor.id, "role": "donor", "name": donor.name}), 201


@auth_bp.route('/register/charity', methods=['POST'])
def register_charity():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Email and password are required"}), 400

    if Charity.query.filter_by(email=email).first():
        return jsonify({"error": "Charity email already registered"}), 409

    charity = Charity(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        created_at=datetime.utcnow(),
        approved_at=None
    )
    db.session.add(charity)
    db.session.commit()

    return jsonify({"msg": "Charity application submitted. Awaiting approval."}), 201

# === LOGIN ROUTES ===

@auth_bp.route('/login/donor', methods=['POST'])
def login_donor():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Donor.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id, additional_claims={"role": "donor"})
    return jsonify({"access_token": token, "user_id": user.id, "role": "donor", "name": user.name}), 200


@auth_bp.route('/login/charity', methods=['POST'])
def login_charity():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Charity.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401
    if user.approved_at is None:
        return jsonify({"error": "Charity not approved yet"}), 403

    token = create_access_token(identity=user.id, additional_claims={"role": "charity"})
    return jsonify({"access_token": token, "user_id": user.id, "role": "charity", "name": user.name}), 200

SECRET_ADMIN_KEY = os.getenv('SECRET_ADMIN_KEY')
@auth_bp.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    secret_key = data.get('secret_key')

    if secret_key != "SECRET_ADMIN_KEY": 
        return jsonify({"error": "Unauthorized"}), 403

    user = Admin.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id, additional_claims={"role": "admin"})
    return jsonify({
        "access_token": token,
        "user_id": user.id,
        "role": "admin",
        "name": user.name
    }), 200
