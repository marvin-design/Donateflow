from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest
from models.charity import Charity
from models.beneficiary import Beneficiary
from models.inventory import InventoryItem
from models.charityApplications import CharityApplication
from extensions import db
from flask_jwt_extended import jwt_required,get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError


charity_bp = Blueprint ("charity", __name__ )


@charity_bp.route('/apply', methods=['POST'])
def apply_charity():
    """Public endpoint for applying to register as a new charity."""
    data = request.get_json()

    try:
        email = data['email'].strip().lower()

        # Check for duplicate email in both tables
        if Charity.query.filter_by(email=email).first() or CharityApplication.query.filter_by(email=email).first():
            raise BadRequest("Email already exists")

        password = data.get('password', 'temporary')  # Optional: get from form or auto-generate
        hashed_pw = generate_password_hash(password)

        application = CharityApplication(
            charity_name=data['charity_name'],
            email=email,
            description=data['description'],
            password_hash=hashed_pw,
            status='pending'
        )
        db.session.add(application)
        db.session.commit()

        return jsonify(application.to_dict()), 201

    except KeyError as e:
        raise BadRequest(f"Missing required field: {str(e)}")

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



@charity_bp.route('/<int:charity_id>/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard(charity_id):
    """Secure view of charity dashboard (no identity check)."""
    charity = Charity.query.get_or_404(charity_id)

    return jsonify({
        "charity": charity.to_dict(),
        "total_beneficiaries": len(charity.beneficiaries),
        "total_inventory": sum(item.amount for item in charity.inventory_items),
        "recent_activity": {
            "last_beneficiary_added": charity.beneficiaries[-1].to_dict() if charity.beneficiaries else None,
            "last_inventory_added": charity.inventory_items[-1].to_dict() if charity.inventory_items else None
        }
    })


@charity_bp.route('/<int:charity_id>/beneficiaries', methods=['POST'])
def add_beneficiary(charity_id):
    """Add a new beneficiary."""
    data = request.get_json()
    try:
        beneficiary = Beneficiary(
            name=data['name'],
            location=data['location'],
            charity_id=charity_id
        )
        db.session.add(beneficiary)
        db.session.commit()
        return jsonify(beneficiary.to_dict()), 201
    except KeyError as e:
        raise BadRequest(f"Missing required field: {str(e)}")

@charity_bp.route('/<int:charity_id>/beneficiaries', methods=['GET'])
def list_beneficiaries(charity_id):
    """List all beneficiaries for a charity."""
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.to_dict() for b in beneficiaries])


@charity_bp.route('/<int:charity_id>/inventory', methods=['POST'])
def add_inventory_item(charity_id):
    """Add new inventory item."""
    data = request.get_json()
    try:
        
        beneficiary = Beneficiary.query.filter_by(
            id=data['beneficiary_id'],
            charity_id=charity_id
        ).first_or_404()
        
        inventory_item = InventoryItem(
            item_name=data['item_name'],
            amount=data['amount'],
            sent_date=data['sent_date'],
            beneficiary_id=beneficiary.id,
            charity_id=charity_id
        )
        db.session.add(inventory_item)
        db.session.commit()
        return jsonify(inventory_item.to_dict()), 201
    except KeyError as e:
        raise BadRequest(f"Missing required field: {str(e)}")

@charity_bp.route('/<int:charity_id>/inventory', methods=['GET'])
def list_inventory_items(charity_id):
    """List all inventory items for a charity."""
    items = InventoryItem.query.filter_by(charity_id=charity_id).all()
    return jsonify([item.to_dict() for item in items])


@charity_bp.route('/charity/<int:charity_id>/profile', methods=['PATCH'])
@jwt_required()
def update_charity_profile(charity_id):
    claims = get_jwt()
    if claims.get("role") != "charity" or get_jwt_identity() != charity_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    charity.name = data.get('name', charity.name)
    charity.email = data.get('email', charity.email)
    charity.description = data.get('description', charity.description)
    db.session.commit()

    return jsonify({
        "message": "Charity profile updated",
        "name": charity.name,
        "email": charity.email,
        "description": charity.description
    }), 200
