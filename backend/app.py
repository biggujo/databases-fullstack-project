from flask import Flask, abort
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/")
def run():
    return {
        "msg": "Hello, World!",
        "time": datetime.now().timestamp()
    }

if __name__ == "__main__":
    app.run(debug=True, port=6001, host="0.0.0.0")
