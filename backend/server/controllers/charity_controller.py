from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import Charity, CharitySchema, db
from ..utils import admin_required

charity_bp = Blueprint('charity', __name__, url_prefix='/api/charities')

charity_schema = CharitySchema()
charities_schema = CharitySchema(many=True)

@charity_bp.route('/', methods=['GET'])
def get_charities():
    """Get all approved charities"""
    charities = Charity.query.filter_by(verified=True).all()
    return jsonify(charities_schema.dump(charities)), 200

@charity_bp.route('/<int:charity_id>', methods=['GET'])
def get_charity(charity_id):
    """Get single charity by ID"""
    charity = Charity.query.get_or_404(charity_id)
    return charity_schema.jsonify(charity), 200

@charity_bp.route('/', methods=['POST'])
@login_required
@admin_required
def create_charity():
    """Create new charity (Admin only)"""
    data = request.get_json()
    
    
    if not all(k in data for k in ['name', 'email', 'description']):
        return jsonify({"error": "Missing required fields"}), 400
    
    charity = Charity(
        name=data['name'],
        email=data['email'],
        description=data['description'],
        verified=data.get('verified', False),
        logo_url=data.get('logo_url'),
        website=data.get('website')
    )
    
    db.session.add(charity)
    db.session.commit()
    return charity_schema.jsonify(charity), 201

@charity_bp.route('/<int:charity_id>', methods=['PUT'])
@login_required
@admin_required
def update_charity(charity_id):
    """Update charity (Admin only)"""
    charity = Charity.query.get_or_404(charity_id)
    data = request.get_json()
    
    charity.name = data.get('name', charity.name)
    charity.email = data.get('email', charity.email)
    charity.description = data.get('description', charity.description)
    charity.verified = data.get('verified', charity.verified)
    charity.logo_url = data.get('logo_url', charity.logo_url)
    charity.website = data.get('website', charity.website)
    
    db.session.commit()
    return charity_schema.jsonify(charity), 200

@charity_bp.route('/<int:charity_id>', methods=['DELETE'])
@login_required
@admin_required
def delete_charity(charity_id):
    """Delete charity (Admin only)"""
    charity = Charity.query.get_or_404(charity_id)
    db.session.delete(charity)
    db.session.commit()
    return jsonify({"message": "Charity deleted"}), 200


@charity_bp.route('/applications', methods=['GET'])
@login_required
@admin_required
def get_applications():
    """Get unverified charity applications (Admin only)"""
    applications = Charity.query.filter_by(verified=False).all()
    return jsonify(charities_schema.dump(applications)), 200

@charity_bp.route('/<int:charity_id>/approve', methods=['PATCH'])
@login_required
@admin_required
def approve_charity(charity_id):
    """Approve charity application (Admin only)"""
    charity = Charity.query.get_or_404(charity_id)
    charity.verified = True
    db.session.commit()
    return jsonify({"message": "Charity approved"}), 200


@charity_bp.route('/<int:charity_id>/stories', methods=['GET'])
def get_charity_stories(charity_id):
    """Get stories for a charity"""
    charity = Charity.query.get_or_404(charity_id)
    return jsonify([story.to_dict() for story in charity.stories]), 200