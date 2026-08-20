import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db_connection

KATEGORIJE_MAP = {
    "majice": ["majica", "majice"],
    "hlace": ["hlače", "hlace"],
    "obleke": ["obleka", "oblekica"],
    "jakne": ["jakna", "vetrovka", "jopica"],
    "krila": ["krilo", "krila", "mini", "kikla"],
}

BARVE_MAP = {
    "rdeca": ["rdeča", "rdeca", "rdec", "rdeč", "rdeco", "rdečo"],
    "modra": ["modra", "modro", "modri", "moder"],
    "zelena": ["zelena", "zeleno", "zeleni", "zelen"],
    "crna": ["črna", "crna", "crno", "črno", "crni", "črni", "Črna", "Črni", "Črno"], #Sql ne podpira sumnikov z lower funkcijo
    "bela": ["bela", "belo", "beli", "bel"],
}

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
        variante = []
        for checked in kategorija: #checked - uporabnik obkljuka
            variante.extend(KATEGORIJE_MAP.get(checked.lower(), [checked.lower()]))
        placeholders = ', '.join('?' for _ in variante)
        query += f" AND LOWER(naziv) IN ({placeholders})"
        params.extend(variante)
        
    if barva:
        variante = []
        for checked in barva:
            variante.extend(BARVE_MAP.get(checked.lower(), [checked.lower()]))
        placeholders = ', '.join('?' for _ in variante)
        query += f" AND LOWER(barva) IN ({placeholders})"
        params.extend(variante)

    cursor.execute(query, params)
    items = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in items]