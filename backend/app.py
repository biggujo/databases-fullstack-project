from flask import Flask, jsonify, session
from flask_cors import CORS
from datetime import datetime
from flask import Flask, jsonify, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/mydatabase'
app.secret_key = "8H0rVLxb0vR93RP04AnFFLHD"

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

engine = create_engine('mysql+pymysql://root:root@db', pool_pre_ping=True)
with engine.connect() as connection:
    connection.execute(text('CREATE DATABASE IF NOT EXISTS mydatabase'))
    connection.commit


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    password_hash = db.Column(db.String(256))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username
        }


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/login', methods=['POST'])
def login():
    body = request.json

    username = body['username']
    password = body['password']

    user = User.query.filter_by(username=username).first()

    auth_error = {
        "message": "Invalid login or password",
    }, 400

    if user is None:
        return auth_error

    if not user.check_password(password):
        return auth_error

    session['logged_in'] = True
    return user.to_json(), 201


@app.route('/logout', methods=['DELETE'])
def logout():
    if 'logged_in' not in session:
        return {
            "message": "Already logged out"
        }, 400

    session.pop('logged_in')
    return {}, 204


@app.route('/register', methods=['POST'])
def register():
    body = request.json

    username = body['username']
    password = body['password']

    user = User.query.filter_by(username=username).first()

    if user is not None:
        return {'message': 'User already exists'}, 400

    new_user = User(username=username)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return new_user.to_json()


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
