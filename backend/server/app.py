from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_apscheduler import APScheduler
from models.task import scheduler_reminder_job
from flask_mail import Mail

app=Flask(__name__)
app.config.from_object('config.Config')

db=SQLAlchemy()
migrate=Migrate()


db.init_app(app)
migrate.init_app(app, db)
mail=Mail(app)

# Configuration for scheduler
scheduler=APScheduler()
scheduler.init_app(app)
app.apscheduler = scheduler
scheduler.start()


scheduler_reminder_job(app)


def register_blueprints():
    from controllers.donor_controller import donor_bp
    app.register_blueprint(donor_bp)
    from controllers.admin_controller import admin_bp
    app.register_blueprint(admin_bp)
    from controllers.auth_controller import auth_bp
    app.register_blueprint(auth_bp)
    



register_blueprints()


if __name__ == '__main__':  
    app.run(debug=True)
    

