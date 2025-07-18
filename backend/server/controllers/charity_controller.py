from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest, NotFound
from models import Charity, Beneficiary, InventoryItem, db
from sqlalchemy.exc import IntegrityError

# Create a Blueprint for charity routes
charity_bp = Blueprint('charity', __name__, url_prefix='/api/charity')

# --- Charity Registration & Dashboard ---
@charity_bp.route('/apply', methods=['POST'])
def apply_charity():
    """Apply to register as a new charity."""
    data = request.get_json()
    try:
        new_charity = Charity(
            name=data['name'],
            email=data['email'],
            mission=data['mission'],
            status='pending'  # Default status (admin must approve)
        )
        db.session.add(new_charity)
        db.session.commit()
        return jsonify(new_charity.to_dict()), 201
    except KeyError as e:
        raise BadRequest(f"Missing required field: {str(e)}")
    except IntegrityError:
        db.session.rollback()
        raise BadRequest("Email already exists")

@charity_bp.route('/<int:charity_id>/dashboard', methods=['GET'])
def get_dashboard(charity_id):
    """View donation summaries and charity details."""
    charity = Charity.query.get_or_404(charity_id)
    
    return jsonify({
        "charity": charity.to_dict(),
        "total_beneficiaries": len(charity.beneficiaries),
        "total_inventory": sum(item.amount for item in charity.inventory_items)
    })

# --- Beneficiary Management ---
@charity_bp.route('/<int:charity_id>/beneficiaries', methods=['POST'])
def add_beneficiary(charity_id):
    """Add a new beneficiary (e.g., supported girls)."""
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
    """List all beneficiaries supported by the charity."""
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.to_dict() for b in beneficiaries])

# --- Inventory Management ---
@charity_bp.route('/<int:charity_id>/inventory', methods=['POST'])
def add_inventory_item(charity_id):
    """Record distributed inventory (e.g., sanitary pads)."""
    data = request.get_json()
    try:
        inventory_item = InventoryItem(
            item_name=data['item_name'],
            amount=data['amount'],
            sent_date=data['sent_date'],
            beneficiary_id=data['beneficiary_id'],
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