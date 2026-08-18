import jwt
import datetime

from functools import wraps
from flask import request, jsonify

from config import SECRET_KEY, JWT_EXPIRATION_SECONDS

def generate_token (user_id, email):
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=JWT_EXPIRATION_SECONDS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Manjka token.'}), 401

        token = auth_header[7:] 
        payload = decode_token(token)
        
        
        if not payload:
            return jsonify({'error': 'Token je potekel ali je neveljaven.'}), 401

        request.user = payload
        return f(*args, **kwargs)
    return decorated