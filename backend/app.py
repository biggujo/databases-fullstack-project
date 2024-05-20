from flask import session
from flask_cors import CORS

from routes import user_route, task_route, group_route
from helpers.main import app, db
from database.config import init_db_connection
from decorators.error_handlers import create_error_handlers
from decorators.authorize_user import authorize_user

# Decorators
CORS(app, supports_credentials=True)

init_db_connection()
create_error_handlers(app)

# Routers
app.register_blueprint(user_route.blueprint, url_prefix='/api/users')
app.register_blueprint(task_route.blueprint, url_prefix='/api/tasks')
app.register_blueprint(group_route.blueprint, url_prefix='/api/groups')


@app.route('/')
@authorize_user
def test():
    return {
        "current_user": (session.get("id"))
    }


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=6001, host="0.0.0.0")
