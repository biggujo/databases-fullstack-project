from flask_cors import CORS
from routes import user_route
from helpers.main import app, db
from database.config import init_db_connection

CORS(app)

init_db_connection()

# Routers
app.register_blueprint(user_route.blueprint, url_prefix='/api/users')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=6001, host="0.0.0.0")
