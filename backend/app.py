
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "kirana.db"


def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            expiry TEXT NOT NULL
        )
    """)

    count = connection.execute(
        "SELECT COUNT(*) FROM products"
    ).fetchone()[0]

    if count == 0:
        sample_products = [
            ("Milk", "Dairy", 10, 30, "2026-11-18"),
            ("Biscuits", "Snacks", 50, 20, "2026-12-20"),
            ("Cooking Oil", "Grocery", 5, 150, "2027-05-10")
        ]

        connection.executemany("""
            INSERT INTO products (name, category, quantity, price, expiry)
            VALUES (?, ?, ?, ?, ?)
        """, sample_products)

    connection.commit()
    connection.close()


@app.route("/")
def home():
    return jsonify({
        "message": "Kirana Store Inventory Backend is running!",
        "status": "success"
    })


@app.route("/api/products", methods=["GET"])
def get_products():
    connection = get_db_connection()
    products = connection.execute(
        "SELECT * FROM products"
    ).fetchall()
    connection.close()

    return jsonify([dict(product) for product in products])


@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.get_json()

    required_fields = ["name", "category", "quantity", "price", "expiry"]

    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "All product fields are required"}), 400

    connection = get_db_connection()

    cursor = connection.execute("""
        INSERT INTO products (name, category, quantity, price, expiry)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["name"],
        data["category"],
        data["quantity"],
        data["price"],
        data["expiry"]
    ))

    connection.commit()

    product = connection.execute(
        "SELECT * FROM products WHERE id = ?",
        (cursor.lastrowid,)
    ).fetchone()

    connection.close()

    return jsonify(dict(product)), 201


@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    connection = get_db_connection()

    cursor = connection.execute(
        "DELETE FROM products WHERE id = ?",
        (product_id,)
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Product not found"}), 404

    return jsonify({"message": "Product deleted successfully"})


if __name__ == "__main__":
    initialize_database()
    app.run(debug=True, port=5000)
