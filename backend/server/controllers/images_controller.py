import cloudinary.uploader
from cloudinary import CloudinaryImage
from flask import Flask, request, jsonify, Blueprint
from cloudinary.utils import cloudinary_url 


images_bp = Blueprint('images_controller', __name__)

@images_bp.route('/upload', methods=['POST'])
def upload_image():
    # Check if image file is in the request
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['image']

    # Check for empty filename
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
    try:
        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file,
            public_id=f"donateflow_{file.filename.split('.')[0]}",
            unique_filename=True,
            overwrite=False,
            folder="donateflow_uploads"
        )

        # Generate an optimized image URL
        image_url, _ = cloudinary_url(
            upload_result['public_id'],
            format="webp",
            width=800,
            crop="limit"
        )

        return jsonify({
            "public_id": upload_result['public_id'],
            "url": image_url
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500