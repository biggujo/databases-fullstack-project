from werkzeug.exceptions import HTTPException
from pydantic import ValidationError
import json


def create_error_handlers(app):
    @app.errorhandler(HTTPException)
    def http_error_handler(error):
        return {
            "message": error.name,
            "status": error.code,
        }, error.code

    @app.errorhandler(ValidationError)
    def validation_error_handler(error):
        status = 400
        return {
            "message": json.loads(error.json()),
            "status": status,
        }, status
