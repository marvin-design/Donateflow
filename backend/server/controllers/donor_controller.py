from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from extensions import db
from models.donation import Donation
from models.donor import Donor
from models.charity import Charity


donor_bp = Blueprint('donor_controller', __name__)

@donor_bp.route('/dashboard/<int:donor_id>', methods=['GET'])
@jwt_required()
def donor_dashboard(donor_id):
    donor = Donor.query.get(donor_id)
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

    donations = Donation.query.filter_by(donor_id=donor_id).all()
    total_donated = sum([float(d.amount) for d in donations])

    donations_data = [
        {
            "donation_id": d.id,
            "charity_id": d.charity_id,
            "amount": float(d.amount),
            "date": d.donation_date.strftime('%Y-%m-%d'),
            "method": d.payment_method
        }
        for d in donations
    ]

    return jsonify({
        "donor_id": donor.id,
        "name": donor.name,
        "email": donor.email,
        "total_donated": total_donated,
        "donations": donations_data
    }), 200



@donor_bp.route('/charities', methods=['GET'])
@jwt_required()
def get_charities():
    try:
        charities = Charity.query.all()
        charity_list = [{'id': charity.id, 'name': charity.name,'description':charity.description} for charity in charities]
        return jsonify({'charities': charity_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  
    

@donor_bp.route('/donations', methods=['POST'])
@jwt_required()
def post_donor_donations():
    try:
        donor_id = get_jwt_identity()
        data = request.get_json()

        amount = data.get('amount')
        charity_id = data.get('charity_id')
        is_recurring = data.get('is_recurring', False)
        frequency = data.get('frequency', None)
        payment_method = data.get('payment_method')
        donation_date = data.get('donation_date')

        if not amount or not charity_id or not payment_method:
            return jsonify({'error': 'Missing required fields'}), 400
        donor = Donor.query.get(donor_id)
        if not donor:
            return jsonify({'error': 'Donor not found'}), 404
        charity = Charity.query.get(charity_id)
        if not charity:
            return jsonify({'error': 'Charity not found'}), 404
        donation = Donation(
            donor_id=donor_id,
            charity_id=charity_id,
            amount=amount,
            is_recurring=is_recurring,
            frequency=frequency,
            payment_method=payment_method,
            donation_date=donation_date
        )
        db.session.add(donation)
        db.session.commit()
        return jsonify({'message': 'Donation created successfully', 'donation_id': donation.id}), 201
    except Exception as e:  
        return jsonify({'error': str(e)}), 500
        

@donor_bp.route('/<int:donor_id>/donations', methods=['GET'])
@jwt_required()
def get_donor_donations(donor_id):
    try:
        donations = Donation.query.filter_by(donor_id=donor_id).all()
        donation_list = []

       
        for donation in donations:
            charity = Charity.query.get(donation.charity_id)
            donation_list.append({
                'id': donation.id,
                'amount': str(donation.amount),
                'is_recurring': donation.is_recurring,
                'frequency': donation.frequency,
                'payment_method': donation.payment_method,
                'donation_date': donation.donation_date.isoformat(),
                'charity': {
                    
                    'name': charity.name
                }
                })
        return jsonify({'donations': donation_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500 
    
@donor_bp.route('/<int:donor_id>/reminder', methods=['PATCH'])
@jwt_required()
def update_reminder(donor_id):
    data = request.get_json()
    donation_id = data.get('donation_id')
    reminder_status = data.get('reminder_sent', True)

    donation = Donation.query.filter_by(id=donation_id, donor_id=donor_id).first()
    if not donation:
        return jsonify({"error": "Donation not found"}), 404

    donation.reminder_sent = reminder_status
    db.session.commit()
    return jsonify({"message": "Reminder status updated"}), 200


@donor_bp.route('/<int:donor_id>/profile', methods=['PATCH'])
@jwt_required()
def update_donor_profile(donor_id):
    claims = get_jwt()
    if claims.get("role") != "donor" or get_jwt_identity() != donor_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    donor = Donor.query.get(donor_id)
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

    donor.name = data.get('name', donor.name)
    donor.email = data.get('email', donor.email)
    db.session.commit()

    return jsonify({
        "message": "Donor profile updated",
        "name": donor.name,
        "email": donor.email
    }), 200
@donor_bp.route('/donations/recurring', methods=['GET'])
@jwt_required()
def get_recurring_donations():
    current_user_id = get_jwt_identity()
    donations = Donation.query.filter_by(donor_id=current_user_id, is_recurring=True).all()
    return jsonify([d.to_dict() for d in donations]), 200
@donor_bp.route('/isrecurring', methods=['PATCH'])
@jwt_required()
def update_recurring():
    data = request.get_json()
    donation_id = data.get('donation_id')
    is_recurring = data.get('is_recurring')
    frequency = data.get('frequency')

    if donation_id is None:
        return jsonify({"error": "Donation ID is required"}), 400

    donation = Donation.query.get(donation_id)

    if not donation:
        return jsonify({"error": "Donation not found"}), 404

    current_user_id = get_jwt_identity()

    if donation.donor_id != current_user_id:
        return jsonify({"error": "Unauthorized to update this donation"}), 403

    if is_recurring is not None:
        donation.is_recurring = is_recurring

    if frequency:
        donation.frequency = frequency

    try:
        db.session.commit()
        return jsonify({
            "message": "Donation updated successfully",
            "donation": {
                "id": donation.id,
                "is_recurring": donation.is_recurring,
                "frequency": donation.frequency
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update donation", "details": str(e)}), 500


@donor_bp.route('/charity', methods=['GET'])
@jwt_required()
def get_charity_by_name():
    name = request.args.get('name')
    charity = Charity.query.filter_by(name=name).first()
    if charity:
        return jsonify({"id": charity.id, "name": charity.name})
    return jsonify({"error": "Charity not found"}), 404
