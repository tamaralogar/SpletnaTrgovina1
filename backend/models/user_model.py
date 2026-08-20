import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db_connection
from werkzeug.security import generate_password_hash, check_password_hash

def get_user(email):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()
    return dict(user) if user else None

def create_user(email, password):
    if get_user(email):
        raise ValueError("User with this email already exists")

    password_hash = generate_password_hash(password)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (email, password_hash) VALUES (?, ?)', (email, password_hash))
    conn.commit()
    conn.close()
    return True

def verify_user(email, password):
    user = get_user(email)
    if user and check_password_hash(user['password_hash'], password):
        return user
    return None