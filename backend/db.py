import sqlite3
from werkzeug.security import generate_password_hash
from datetime import datetime

def get_db_connection(db_path='database.db'):
    """Establishes a connection to the SQLite database."""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # Enable dictionary-like row access
    return conn

def create_table(conn):
    """Creates a sample table in the database."""
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scam_count (
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            date_reported TEXT NOT NULL
        )
    ''')
    conn.commit()
    cursor.close()

def create_users_table(conn):
    """Creates a users table in the database."""
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            dob DATE NOT NULL,
            gender TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')
    conn.commit()
    cursor.close()

def register_user(conn, user_data):
    """
    Writes a new user to the 'users' table.

    Parameters:
        conn (sqlite3.Connection): Database connection.
        user_data (dict): Dictionary with keys: name, surname, email, phone, password, dob, gender.
    """
    cursor = conn.cursor()

    # Hash the password before storing
    hashed_password = generate_password_hash(user_data['password'])

    # Current UTC timestamp as ISO string
    created_at = datetime.utcnow().isoformat()

    cursor.execute("""
        INSERT INTO users (name, surname, email, phone, password, dob, gender, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        user_data['name'],
        user_data['surname'],
        user_data['email'],
        user_data['phone'],
        hashed_password,
        user_data['dob'],
        user_data['gender'],
        created_at
    ))
    conn.commit()
    cursor.close()

def write_to_db(conn, data):
    """Inserts a new record into the scam_count table."""
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO scam_count (type, description, location, date_reported)
        VALUES (?, ?, ?, ?)
    ''', (data['type'], data["description"], data['location'], data['date_reported']))
    conn.commit()
    cursor.close()

def read_from_db(conn):
    """Fetches all records from the scam_count table."""
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM scam_count')
    rows = cursor.fetchall()
    cursor.close()
    return rows

def create_all_tables():
    conn = get_db_connection()
    create_table(conn)
    create_users_table(conn)
    conn.close()

if __name__ == '__main__':
    create_all_tables()
