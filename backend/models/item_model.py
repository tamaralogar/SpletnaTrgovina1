import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db_connection

def get_all_items(velikost=None, max_cena=None, kategorija=None, barva=None):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM items WHERE 1=1"
    params = []

    if velikost and (velikost != "Vse velikosti"):
        query += " AND velikost = ?"
        params.append(velikost)

    if max_cena is not None:
        query += " AND cena <= ?"
        params.append(max_cena)

    if kategorija:
        placeholders = ', '.join('?' for _ in kategorija)
        query += f" AND LOWER(naziv) IN ({placeholders})"
        params.extend([k.lower() for k in kategorija])
        
    if barva:
        placeholders = ', '.join('?' for _ in barva)
        query += f" AND LOWER(barva) IN ({placeholders})"
        params.extend([b.lower() for b in barva])

    cursor.execute(query, params)
    items = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in items]