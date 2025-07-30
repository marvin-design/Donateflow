from flask import Blueprint, request, jsonify
import datetime, requests, base64
from requests.auth import HTTPBasicAuth

mpesa_bp = Blueprint("mpesa", __name__, url_prefix="/api")

@mpesa_bp.route("/donors/donations", methods=["POST"])
def create_donation():
    phone = request.form['phone']
    amount = request.form['amount']
    

    consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
    consumer_secret = "amFbAoUByPV2rM5A"
    auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(auth_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    access_token = "Bearer " + response.json()['access_token']

    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    shortcode = "174379"
    data_to_encode = shortcode + passkey + timestamp
    password = base64.b64encode(data_to_encode.encode()).decode()

    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": "https://coding.co.ke/api/confirm.php",
        "AccountReference": "SokoGarden Online",
        "TransactionDesc": "Payments for Products"
    }

    headers = {
        "Authorization": access_token,
        "Content-Type": "application/json"
    }

    stk_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    r = requests.post(stk_url, json=payload, headers=headers)
    return jsonify({"message": "MPESA Prompt Sent to Phone"})


