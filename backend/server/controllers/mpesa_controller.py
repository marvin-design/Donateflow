from flask import Blueprint, request, jsonify
import datetime, requests, base64
from requests.auth import HTTPBasicAuth
from extensions import db
from models.donation import Donation
from models.charity import Charity
from models.donor import Donor

mpesa_bp = Blueprint("mpesa", __name__ )


from config import Config
MPESA_SHORTCODE = Config.MPESA_SHORTCODE
MPESA_PASSKEY = Config.MPESA_PASSKEY
CALLBACK_URL = Config.MPESA_CALLBACK_URL
CONSUMER_KEY = Config.MPESA_CONSUMER_KEY
CONSUMER_SECRET = Config.MPESA_CONSUMER_SECRET

def get_mpesa_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json().get('access_token')

@mpesa_bp.route("/donate", methods=["POST"])
def initiate_mpesa_donation():
    data = request.get_json()
    phone = data.get('phone')
    amount = data.get('amount')
    charity_id = data.get('charity_id')
    donor_id = data.get('donor_id')
    payment_method = "mpesa"

    if not Charity.query.get(charity_id):
        return jsonify({"msg": "Invalid charity ID"}), 400

    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((MPESA_SHORTCODE + MPESA_PASSKEY + timestamp).encode()).decode()

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
        "AccountReference": f"Charity-{charity_id}",
        "TransactionDesc": "Donation to charity"
    }

    headers = {
        "Authorization": "Bearer " + get_mpesa_token(),
        "Content-Type": "application/json"
    }

    res = requests.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", json=payload, headers=headers)

    # Log unverified donation
    donation = Donation(
        donor_id=donor_id,
        charity_id=charity_id,
        amount=amount,
        payment_method=payment_method,
        phone_number=phone,
        donation_date=datetime.datetime.utcnow()
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({"msg": "M-Pesa prompt sent", "donation_id": donation.id}), 200
@mpesa_bp.route("/callback", methods=["POST"])
def mpesa_callback():
    data = request.get_json()
    try:
        body = data.get("Body", {}).get("stkCallback", {})
        result_code = body.get("ResultCode")
        if result_code != 0:
            return jsonify({"msg": "Transaction failed"}), 200

        metadata = body.get("CallbackMetadata", {}).get("Item", [])
        phone = next((item['Value'] for item in metadata if item['Name'] == 'PhoneNumber'), None)
        amount = next((item['Value'] for item in metadata if item['Name'] == 'Amount'), None)
        mpesa_code = next((item['Value'] for item in metadata if item['Name'] == 'MpesaReceiptNumber'), None)

        donation = Donation.query.filter_by(phone_number=phone, amount=amount, transaction_code=None).first()
        if donation:
            donation.transaction_code = mpesa_code
            db.session.commit()

        return jsonify({"msg": "Donation confirmed"}), 200

    except Exception as e:
        return jsonify({"msg": f"Error processing callback: {str(e)}"}), 500