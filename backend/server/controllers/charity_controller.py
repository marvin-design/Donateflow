from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest, NotFound
from models import Charity, Beneficiary, Inventory, db


charity_bp = Blueprint('charity', __name__, url_prefix='/api/charity')


@charity_bp.route('/apply', methods=['POST'])
def apply_charity():
    """Apply to register as a new charity."""
    data = request.get_json()
    try:
        new_charity = Charity(
            name=data['name'],
            email=data['email'],
            mission=data['mission'],
            status='pending'  
        )
        db.session.add(new_charity)
        db.session.commit()
        return jsonify({"message": "Application submitted! Awaiting admin approval."}), 201
    except KeyError as e:
        raise BadRequest(f"Missing required field: {str(e)}")

@charity_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    """View donation summaries and charity details."""
    charity_id = request.args.get('charity_id')
    charity = Charity.query.get_or_404(charity_id)
    
    return jsonify({
        "charity": charity.to_dict(),
        "total_donations": charity.total_donations,
        "recent_donors": [d.to_dict() for d in charity.donors if not d.anonymous]
    })


@charity_bp.route('/beneficiary/add', methods=['POST'])
def add_beneficiary():
    """Add a new beneficiary (e.g., supported girls)."""
    data = request.get_json()
    beneficiary = Beneficiary(
        charity_id=data['charity_id'],
        name=data['name'],
        age=data['age'],
        school=data.get('school', '')
    )
    db.session.add(beneficiary)
    db.session.commit()
    return jsonify({"message": "Beneficiary added!"}), 201

@charity_bp.route('/beneficiary/list', methods=['GET'])
def list_beneficiaries():
    """List all beneficiaries supported by the charity."""
    charity_id = request.args.get('charity_id')
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.to_dict() for b in beneficiaries])


@charity_bp.route('/inventory/record', methods=['POST'])
def record_inventory():
    """Record distributed inventory (e.g., sanitary pads)."""
    data = request.get_json()
    inventory = Inventory(
        charity_id=data['charity_id'],
        item_name=data['item_name'],
        quantity=data['quantity'],
        date_distributed=data['date_distributed']
    )
    db.session.add(inventory)
    db.session.commit()
    return jsonify({"message": "Inventory recorded!"}), 201


@charity_bp.route('/story/create', methods=['POST'])
def create_story():
    """Post a success story about beneficiaries."""
    data = request.get_json()
    story = Story(
        charity_id=data['charity_id'],
        title=data['title'],
        content=data['content'],
        beneficiary_id=data.get('beneficiary_id')
    )
    db.session.add(story)
    db.session.commit()
    return jsonify({"message": "Story published!"}), 201