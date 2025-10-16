from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# ✅ Connect to MongoDB Compass (local)
# Ensure MongoDB service is running locally (in Compass use mongodb://localhost:27017)
client = MongoClient("mongodb://127.0.0.1:27017/")

# ✅ Select database and collection
db = client["projectdb"]
users_collection = db["users"]

# ✅ Create or update a user
@app.route('/users', methods=['POST'])
def create_or_update_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    description = data.get('description')

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        users_collection.update_one(
            {"email": email},
            {"$set": {"name": name, "description": description}}
        )
        return jsonify({"message": "User updated successfully"}), 200
    else:
        users_collection.insert_one({
            "name": name,
            "email": email,
            "description": description
        })
        return jsonify({"message": "User created successfully"}), 201

# ✅ Get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = list(users_collection.find({}, {"_id": 0}))
    return jsonify(users), 200

# ✅ Get one user by email
@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    user = users_collection.find_one({"email": email}, {"_id": 0})
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

# ✅ Delete a user
@app.route('/users/<email>', methods=['DELETE'])
def delete_user(email):
    result = users_collection.delete_one({"email": email})
    if result.deleted_count:
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
