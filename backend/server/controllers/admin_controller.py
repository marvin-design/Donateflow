from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required,get_jwt_identity
from app import db,mail
from models.charityApplications import CharityApplication
from flask_mail import Message
from models.charity import Charity
from datetime import datetime

admin_bp = Blueprint('admin_controller', __name__)

@admin_bp.route('/charity_applications', methods=['GET'])
@jwt_required()
def get_charity_applications():
    status_filter = request.args.get('status')
    try:
        if status_filter:
            applications = CharityApplication.query.filter_by(status=status_filter).all()
        else:
            applications = CharityApplication.query.all()
        
        application_list = [
            {'id': app.id, 
             'charity_name': app.charity_name, 'email': app.email, 
             'status': app.status} for app in applications]
        return jsonify({'applications': application_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@admin_bp.route('/charity_applications/<int:application_id>/review', methods=['POST'])
@jwt_required()
def review_charity_application(application_id):
    data = request.get_json()
    action = data.get('action') 

    if action not in ['approve', 'reject']:
        return jsonify({'error': 'Invalid action. Must be "approve" or "reject".'}), 400

    application = CharityApplication.query.get(application_id)
    if not application:
        return jsonify({'error': 'Charity application not found'}), 404

    if application.status != 'pending':
        return jsonify({'error': f'Application has already been {application.status}'}), 400

    try:
        current_admin_id = get_jwt_identity()  
        email = application.email
        charity_name = application.charity_name

        if action == 'reject':
            application.status = 'rejected'
            application.reviewed_by = current_admin_id
            application.reviewed_at = datetime.utcnow()

          
            msg = Message(
                subject='Charity Application Rejected',
                recipients=[email],
                body=f'Dear {charity_name},\n\nWe regret to inform you that your charity application has been rejected.\n\nRegards,\nDonateFlow Admin'
            )
            mail.send(msg)

         
            db.session.delete(application)
            db.session.commit()

            return jsonify({'message': 'Application rejected, deleted, and email sent'}), 200

        elif action == 'approve':
         
            existing_charity = Charity.query.filter_by(email=email).first()
            if existing_charity:
                return jsonify({'error': 'A charity with this email already exists'}), 400
            
        
            new_charity = Charity(
                name=charity_name,
                email=email,
                password_hash=application.password_hash,
                description=application.description,
                approved_at=datetime.utcnow()
            )
            db.session.add(new_charity)

            application.status = 'approved'
            application.reviewed_by = current_admin_id
            application.reviewed_at = datetime.utcnow()

         
            msg = Message(
                subject='Charity Application Approved',
                recipients=[email],
                body=f'Dear {charity_name},\n\nCongratulations! Your charity application has been approved. You can now access your account.\n\nRegards,\nDonateFlow Admin'
            )
            mail.send(msg)

           
            db.session.delete(application)
            db.session.commit()

            return jsonify({'message': 'Charity approved, application deleted, and email sent', 'charity_id': new_charity.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    

@admin_bp.route('/charity/<int:charity_id>', methods=['DELETE'])
@jwt_required()
def delete_charity(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'error': 'Charity not found'}), 404

    try:
        db.session.delete(charity)
        db.session.commit()
        return jsonify({'message': 'Charity deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
