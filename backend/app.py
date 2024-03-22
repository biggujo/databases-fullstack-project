from flask import Flask, abort
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/mydatabase'
db = SQLAlchemy(app)
class Table(db.Model):
    __tablename__ = 'example'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(128))

@app.route('/data')
def get_data():
    all_data = Table.query.all()
    return jsonify([{'id': item.id, 'name': item.name} for item in all_data])


@app.route("/")
def run():
    return {
        "msg": "Hello, World!",
        "time": datetime.now().timestamp()
    }

if __name__ == "__main__":
    app.run(debug=True, port=6001, host="0.0.0.0")
