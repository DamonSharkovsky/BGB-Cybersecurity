import sqlite3

def get_db_connection(db_path='database.db'):
    """Establishes a connection to the SQLite database."""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # Enable dictionary-like row access
    return conn

def create_table(conn):
    """Creates a sample table in the database."""
    conn = get_db_connection()
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
    conn.close()


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

if __name__ == '__main__':
    create_table(get_db_connection())