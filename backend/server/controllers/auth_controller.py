from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import datetime
from app import db
from models.donor import Donor
from models.charity import Charity
from models.admin import Admin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/donor/register', methods=['POST'])
def register_donor():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if Donor.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    new_donor = Donor(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        created_at=datetime.utcnow()
    )
    db.session.add(new_donor)
    db.session.commit()

    access_token = create_access_token(identity=new_donor.id, additional_claims={"role": "donor"})
    return jsonify({
        'access_token': access_token,
        'role': 'donor',
        'user_id': new_donor.id,
        'name': new_donor.name
    }), 201


@auth_bp.route('/donor/login', methods=['POST'])
def login_donor():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    donor = Donor.query.filter_by(email=email).first()
    if not donor or not check_password_hash(donor.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=donor.id, additional_claims={"role": "donor"})
    return jsonify({
        'access_token': access_token,
        'role': 'donor',
        'user_id': donor.id,
        'name': donor.name
    }), 200


@auth_bp.route('/charity/register', methods=['POST'])
def register_charity():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    description = data.get('description')
    password = data.get('password')

    if Charity.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    new_charity = Charity(
        name=name,
        email=email,
        description=description,
        password_hash=generate_password_hash(password),
        created_at=datetime.utcnow()
    )
    db.session.add(new_charity)
    db.session.commit()

    return jsonify({'message': 'Charity account created. Awaiting approval.'}), 201


@auth_bp.route('/charity/login', methods=['POST'])
def login_charity():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    charity = Charity.query.filter_by(email=email).first()
    if not charity or not check_password_hash(charity.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    if not charity.approved_at:
        return jsonify({'error': 'Charity not approved yet'}), 403

    access_token = create_access_token(identity=charity.id, additional_claims={"role": "charity"})
    return jsonify({
        'access_token': access_token,
        'role': 'charity',
        'user_id': charity.id,
        'name': charity.name
    }), 200


@auth_bp.route('/admin/login', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    admin = Admin.query.filter_by(email=email).first()
    if not admin or not check_password_hash(admin.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=admin.id, additional_claims={"role": "admin"})
    return jsonify({
        'access_token': access_token,
        'role': 'admin',
        'user_id': admin.id,
        'name': admin.name
    }), 200