from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text

app = Flask(__name__)
CORS(app)

engine = create_engine('mysql+pymysql://root:root@db')

with engine.connect() as connection:
    connection.execute(text('CREATE DATABASE IF NOT EXISTS mydatabase'))

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/mydatabase'
db = SQLAlchemy(app)
class MyTable(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    def to_json(self):
       return {
            'id': self.id,
        }
    
@app.route('/table', methods=['GET'])
def get_table():
    table_data = MyTable.query.all()
    return jsonify([row.to_json() for row in table_data])

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
