// Backend - Python (server.py)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {"test": "password"}  # Simulim baze të dhënash
financial_data = {}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]
    if username in users and users[username] == password:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/save", methods=["POST"])
def save_data():
    data = request.json
    financial_data[data["username"]] = {
        "income": data["income"],
        "expenses": data["expenses"],
        "savingsGoal": data["savingsGoal"],
    }
    return jsonify({"message": "Data saved successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
