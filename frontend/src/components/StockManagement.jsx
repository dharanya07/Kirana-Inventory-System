
import React, { useState } from "react";
import "./StockManagement.css";

function StockManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: "Milk", category: "Dairy", quantity: 20 },
    { id: 2, name: "Biscuits", category: "Snacks", quantity: 35 },
    { id: 3, name: "Cooking Oil", category: "Grocery", quantity: 10 },
    { id: 4, name: "Rice", category: "Grocery", quantity: 50 },
  ]);

  const [selectedId, setSelectedId] = useState("1");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("add");
  const [message, setMessage] = useState("");

  const updateStock = () => {
    const value = Number(amount);

    if (!selectedId || !Number.isInteger(value) || value <= 0) {
      setMessage("Please select a product and enter a valid quantity.");
      return;
    }

    const selectedProduct = products.find(
      (product) => product.id === Number(selectedId)
    );

    if (action === "remove" && selectedProduct.quantity < value) {
      setMessage("Not enough stock available!");
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        if (product.id === Number(selectedId)) {
          return {
            ...product,
            quantity:
              action === "add"
                ? product.quantity + value
                : product.quantity - value,
          };
        }
        return product;
      })
    );

    setMessage("Stock updated successfully!");
    setAmount("");
  };

  const lowStockCount = products.filter(
    (product) => product.quantity <= 15
  ).length;

  return (
    <div className="stock-page">
      <h1>Stock Management</h1>
      <p>Manage your store inventory and stock quantities.</p>

      <div className="stock-summary">
        <div className="stock-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="stock-card">
          <h3>Total Stock Units</h3>
          <h2>
            {products.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </h2>
        </div>

        <div className="stock-card">
          <h3>Low Stock Products</h3>
          <h2 className="low-stock-number">{lowStockCount}</h2>
        </div>
      </div>

      <div className="stock-update-box">
        <h2>Update Stock</h2>

        <label>Select Product</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label>Action</label>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="add">Add Stock</option>
          <option value="remove">Remove Stock</option>
        </select>

        <label>Quantity</label>
        <input
          type="number"
          min="1"
          placeholder="Enter quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={updateStock}>Update Stock</button>

        {message && <p className="stock-message">{message}</p>}
      </div>

      <h2>Current Stock Details</h2>

      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Available Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.quantity <= 15 ? (
                    <span className="stock-low">Low Stock</span>
                  ) : (
                    <span className="stock-available">Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockManagement;
