from flask import Flask, jsonify, request
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)  # enables all cross‑origin requests (for dev/testing)

@app.route('/all', methods=['GET'])
def get_data():
    rows = db.read_from_db(db.get_db_connection())
    data = [dict(row) for row in rows]  # convert rows to list of dicts
    return jsonify(data)

@app.route('/scam', methods=['POST'])
def echo():
    data = request.json  # data sent from frontend
    db.write_to_db(db.get_db_connection(), data)  # save to database
    return jsonify({"you_sent": data})

if __name__ == "__main__":
    app.run(debug=True, port=5501)
    db.create_table(db.get_db_connection())  # ensure table exists

