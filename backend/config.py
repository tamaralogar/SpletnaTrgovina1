import os 
import sys
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("JWT_SECRET_KEY ni nastavljen.")

JWT_EXPIRATION_SECONDS = 3600
