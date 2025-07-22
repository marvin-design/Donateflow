import cloudinary.uploader
from cloudinary import CloudinaryImage
def uploadImage(image):

    # Set the asset's public ID and allow overwriting the asset with new versions
    cloudinary.uploader.upload(
        "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/butterfly.jpeg", 
        public_id="quickstart_butterfly", 
        unique_filename = False, 
        overwrite=True)

    # Build the URL for the image and save it in the variable 'srcURL'
    srcURL = CloudinaryImage("quickstart_butterfly").build_url()

    print("*2. Upload an image*\nDelivery URL: ", srcURL, "\n")    

    return srcURL