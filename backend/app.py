from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from flask import Flask, jsonify, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/mydatabase'
db = SQLAlchemy(app)


login_manager = LoginManager()
login_manager.init_app(app)

engine = create_engine('mysql+pymysql://root:root@db')
with engine.connect() as connection:
    connection.execute(text('CREATE DATABASE IF NOT EXISTS mydatabase'))
    connection.commit

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(64))
    def to_json(self):
       return {
            'id': self.id,
            'username': self.username 
        }
    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user:
            if user.password == password:
                login_user(user)
                return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('login.html')


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
