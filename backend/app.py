from datetime import datetime

from helpers.main import app, db
from models import user_model
from flask import request
from flask_cors import CORS
from flask_login import LoginManager
from routes import user_route

from sqlalchemy import create_engine, text

CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

engine = create_engine('mysql+pymysql://root:root@db', pool_pre_ping=True)
with engine.connect() as connection:
    connection.execute(text('CREATE DATABASE IF NOT EXISTS mydatabase'))
    connection.commit


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


app.register_blueprint(user_route.blueprint, url_prefix='/api/users')


@app.route("/")
def run():
    return {
        "msg": "Hello, World!",
        "time": datetime.now().timestamp()
    }


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=6001, host="0.0.0.0")
