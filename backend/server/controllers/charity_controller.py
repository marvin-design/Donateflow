from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest, NotFound
from models import Charity, Beneficiary, InventoryItem, db
from sqlalchemy.exc import IntegrityError


charity_bp = Blueprint ("charity", __name__ )


@charity_bp.route('/apply', methods=['POST'])
def apply_charity():
    """Apply to register as a new charity."""
    data = request.get_json()
    try:
        new_charity = Charity(
            name=data['name'],
            email=data['email'],
            description=data['description'],  
            status='pending'
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
    """View charity dashboard with statistics."""
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


@charity_bp.route('/<int:charity_id>/description', methods=['PATCH'])
def update_description(charity_id):
    """Update charity description."""
    data = request.get_json()
    if 'description' not in data:
        raise BadRequest("Description field required")
    
    charity = Charity.query.get_or_404(charity_id)
    charity.description = data['description']
    db.session.commit()
    return jsonify(charity.to_dict())