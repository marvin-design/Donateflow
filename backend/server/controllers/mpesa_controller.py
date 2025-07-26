from flask import Blueprint, request, jsonify
import datetime, requests, base64
from requests.auth import HTTPBasicAuth
from extensions import db
from models.donation import Donation
from models.charity import Charity
from config import Config

mpesa_bp = Blueprint("mpesa", __name__, url_prefix="/api/mpesa")

# M-Pesa Configuration
MPESA_SHORTCODE = Config.MPESA_SHORTCODE
MPESA_PASSKEY = Config.MPESA_PASSKEY
CALLBACK_URL = f"{Config.BASE_URL}/api/mpesa/callback"
CONSUMER_KEY = Config.MPESA_CONSUMER_KEY
CONSUMER_SECRET = Config.MPESA_CONSUMER_SECRET

def get_mpesa_token():
    """Get M-Pesa API access token"""
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json().get('access_token')

@mpesa_bp.route("/donate", methods=["POST"])
def initiate_mpesa_donation():
    """Initiate M-Pesa STK push payment"""
    data = request.get_json()
    
    # Required fields
    required_fields = ['phone', 'amount', 'charity_id']
    if not all(field in data for field in required_fields):
        return jsonify({
            "success": False,
            "msg": "Missing required fields: phone, amount, charity_id"
        }), 400

    phone = data['phone']
    amount = data['amount']
    charity_id = data['charity_id']
    is_anonymous = data.get('is_anonymous', False)
    is_recurring = data.get('is_recurring', False)
    frequency = data.get('frequency')

    # Validate amount
    try:
        amount = float(amount)
        if amount < 10:  # Minimum amount
            return jsonify({
                "success": False,
                "msg": "Amount must be at least 10 Ksh"
            }), 400
    except ValueError:
        return jsonify({
            "success": False,
            "msg": "Invalid amount format"
        }), 400

    # Validate recurring donation
    if is_recurring and not frequency:
        return jsonify({
            "success": False,
            "msg": "Frequency is required for recurring donations"
        }), 400

    # Check charity exists
    if not Charity.query.get(charity_id):
        return jsonify({
            "success": False,
            "msg": "Invalid charity ID"
        }), 404

    # Format phone number
    if phone.startswith('0'):
        phone = '254' + phone[1:]
    elif phone.startswith('+254'):
        phone = phone[1:]

    # Generate M-Pesa password
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(
        (MPESA_SHORTCODE + MPESA_PASSKEY + timestamp).encode()
    ).decode()

    # Prepare STK push payload
    payload = {
        "BusinessShortCode": MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": f"CHARITY-{charity_id}",
        "TransactionDesc": "Recurring Donation" if is_recurring else "One-time Donation"
    }

    try:
        # Make request to M-Pesa
        headers = {
            "Authorization": f"Bearer {get_mpesa_token()}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            json=payload,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        mpesa_response = response.json()

        # Create donation record
        donation = Donation(
            charity_id=charity_id,
            amount=amount,
            payment_method="mpesa",
            phone_number=None if is_anonymous else phone,
            status='pending',
            mpesa_request_id=mpesa_response.get('CheckoutRequestID'),
            is_recurring=is_recurring,
            frequency=frequency if is_recurring else None
        )
        db.session.add(donation)
        db.session.commit()

        return jsonify({
            "success": True,
            "msg": "M-Pesa prompt sent",
            "donation_id": donation.id,
            "is_recurring": is_recurring
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "msg": f"M-Pesa API error: {str(e)}",
            "error": str(e)
        }), 500

@mpesa_bp.route("/callback", methods=["POST"])
def mpesa_callback():
    """Handle M-Pesa payment callback"""
    try:
        data = request.get_json()
        callback = data.get('Body', {}).get('stkCallback', {})
        result_code = callback.get('ResultCode')
        
        # Check if payment failed
        if result_code != 0:
            return jsonify({
                "success": False,
                "msg": "Payment failed",
                "result_code": result_code
            }), 200

        # Extract payment details
        metadata = callback.get('CallbackMetadata', {}).get('Item', [])
        payment_data = {item['Name']: item.get('Value') for item in metadata}
        
        # Find and update donation record
        donation = Donation.query.filter_by(
            mpesa_request_id=callback.get('CheckoutRequestID')
        ).first()

        if donation:
            donation.status = 'completed'
            donation.transaction_code = payment_data.get('MpesaReceiptNumber')
            donation.payment_date = datetime.datetime.utcnow()
            db.session.commit()

        return jsonify({
            "success": True,
            "msg": "Payment confirmed"
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "msg": f"Error processing callback: {str(e)}"
        }), 500

@mpesa_bp.route("/status/<int:donation_id>", methods=["GET"])
def donation_status(donation_id):
    """Check donation payment status"""
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({
            "success": False,
            "msg": "Donation not found"
        }), 404
    
    return jsonify({
        "success": True,
        "status": donation.status,
        "completed": donation.status == 'completed',
        "is_recurring": donation.is_recurring,
        "frequency": donation.frequency
    })