import os
import sys
import flask
from flask_cors import CORS

from routes.items_routes import items_bp

app = flask.Flask(__name__)
CORS(app)
app.register_blueprint(items_bp)

@app.route('/')
def home():
    return "Welcome to the Shop API!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)