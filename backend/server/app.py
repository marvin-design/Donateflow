from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from apscheduler.schedulers.background import BackgroundScheduler
from flask_mail import Mail
db=SQLAlchemy()
migrate=Migrate()
app=Flask(__name__)

db.init_app(app)
migrate.init_app(app, db)

