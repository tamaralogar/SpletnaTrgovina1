import os
import sys
import json

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db_connection, init_db

ITEMS_JSON_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'SpletnaTrgovina', 'public', 'assets', 'items.json')

def migrate_items():

    init_db()

    with open(ITEMS_JSON_PATH, 'r', encoding='utf-8') as f:
        items = json.load(f)

    conn = get_db_connection()
    cursor = conn.cursor()

    created_items = 0
    already_existing_items = 0

    for item in items:
        try:
            cursor.execute('''
                INSERT INTO items (id,naziv, cena, slika, opis, velikost, barva)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (item['id'], item['naziv'], item['cena'], item['slika'], item.get('opis', ''), item['velikost'], item.get('barva', '')))
            created_items += 1
        except Exception as e:
            already_existing_items += 1
            print (f"Preskocen izdelek id={item.get('id')}, napaka: {e}")

    conn.commit()
    conn.close()

    print(f"Konec. Vstavljenih: {created_items} izdelkov, preskocenih: {already_existing_items} izdelkov.")

if __name__ == '__main__':
    migrate_items()