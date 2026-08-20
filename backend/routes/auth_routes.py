import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Blueprint, jsonify, request
from models.user_model import create_user, verify_user
from jwt_utils import generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email in geslo sta obvezna"}), 400

    try:
        create_user(email, password)
        return jsonify({"message": "Uporabnik uspesno registriran"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = verify_user(email, password)

    if user:
        return jsonify({
            "token": generate_token(user['id'], user['email']),  
            "message": "Prijava uspesna", 
            "email": user['email']
            }), 200
    else:
        return jsonify({"error": "Neveljaven email ali geslo"}), 401