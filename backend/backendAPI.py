from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash
import db

app = Flask(__name__)
CORS(app)  # enables all cross‑origin requests (for dev/testing)

#create_tables
db.create_all_tables()

@app.route('/all', methods=['GET'])
def get_data():
    rows = db.read_from_db(db.get_db_connection())
    data = [dict(row) for row in rows]  # convert rows to list of dicts
    return jsonify(data)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    db.register_user(db.get_db_connection(), data)
    return jsonify({"you_sent": data})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    conn = db.get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        # session['user_id'] = user['id']  # Store user session
        return jsonify({'message': 'Login successful', 'user_id': user['id']}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/submit', methods=['POST'])
def echo():
    data = request.get_json()  # data sent from frontend
    db.write_to_db(db.get_db_connection(), data)  # save to database
    return jsonify({"you_sent": data})

if __name__ == "__main__":
    app.run(debug=True, port=5501)
    db.create_table(db.get_db_connection())  # ensure table exists

