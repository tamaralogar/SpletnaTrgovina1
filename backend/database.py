import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'shop.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    #Tabela za izdelke
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            naziv TEXT NOT NULL,
            cena float NOT NULL,
            slika TEXT NOT NULL,
            opis TEXT,
            velikost TEXT NOT NULL,
            barva TEXT
        )
    ''')

    #Tabela za uporabnike
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )
    ''')

    print ("Dela.")

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()