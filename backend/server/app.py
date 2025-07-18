from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_apscheduler import APScheduler
from config import Config
from models.task import scheduler_reminder_job
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()
mail = Mail()
scheduler = APScheduler()

def create_app(config_class=Config):
    """Application factory pattern for creating the Flask app"""
    app = Flask(__name__,
               static_url_path='/',
               static_folder='../client/dist')
    
    # Configuration
    app.config.from_object(config_class)
    app.url_map.strict_slashes = False

    # Configure CORS
    CORS(app,
         resources={
             r"/api/*": {
                 "origins": "http://localhost:5173",
                 "methods": ["GET", "POST", "DELETE"],
                 "allow_headers": ["Content-Type", "Authorization"]
             }
         },
         supports_credentials=True
    )

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    
    # Initialize and start scheduler
    scheduler.init_app(app)
    app.apscheduler = scheduler
    scheduler.start()
    scheduler_reminder_job(app)

    # Import models (needed for migrations)
    from models import (
        admin, beneficiary, charity, charityApplications, 
        charityStory, donation, donor, inventory, task
    )

    # Register blueprints
    register_blueprints(app)

    # Vue/React frontend handling
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        """Serve static files for frontend routing"""
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")
    
    return app

def register_blueprints(app):
    """Register all application blueprints"""
    from controllers import (
        auth_controller,
        mpesa_controller,
        charity_controller,
        donor_controller,
        admin_controller
    )
    
    # API routes
    app.register_blueprint(auth_controller.auth_bp, url_prefix='/api/auth')
    app.register_blueprint(mpesa_controller.mpesa_bp, url_prefix = 'api/mpesa')
    app.register_blueprint(donor_controller.donor_bp, url_prefix='/api/donors')
    app.register_blueprint(charity_controller.charity_bp, url_prefix='/api/charity')
    app.register_blueprint(admin_controller.admin_bp, url_prefix='/api/admin')

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)