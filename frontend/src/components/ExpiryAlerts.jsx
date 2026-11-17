
import React, { useState } from "react";
import "./ExpiryAlerts.css";

function ExpiryAlerts() {
  const [products] = useState([
    {
      id: 1,
      name: "Milk",
      quantity: 20,
      expiryDate: "2026-11-10",
    },
    {
      id: 2,
      name: "Biscuits",
      quantity: 35,
      expiryDate: "2026-11-25",
    },
    {
      id: 3,
      name: "Cooking Oil",
      quantity: 15,
      expiryDate: "2027-02-15",
    },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getStatus = (date) => {
    const expiry = new Date(date + "T00:00:00");
    const daysLeft = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) return "Expired";
    if (daysLeft <= 30) return "Expiring Soon";
    return "Safe";
  };

  const alerts = products.filter(
    (product) => getStatus(product.expiryDate) !== "Safe"
  );

  return (
    <div className="expiry-page">
      <h1>Expiry Alerts</h1>
      <p>Monitor products that are expired or expiring soon.</p>

      <div className="expiry-summary">
        <div className="expiry-card">
          <h3>Total Alerts</h3>
          <h2>{alerts.length}</h2>
        </div>
        <div className="expiry-card">
          <h3>Expired</h3>
          <h2>
            {products.filter(
              (p) => getStatus(p.expiryDate) === "Expired"
            ).length}
          </h2>
        </div>
        <div className="expiry-card">
          <h3>Expiring Soon</h3>
          <h2>
            {products.filter(
              (p) => getStatus(p.expiryDate) === "Expiring Soon"
            ).length}
          </h2>
        </div>
      </div>

      <h2>Products Requiring Attention</h2>

      {alerts.length === 0 ? (
        <p>No expiry alerts at the moment.</p>
      ) : (
        <table className="expiry-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.expiryDate}</td>
                <td>
                  <span className={
                    getStatus(product.expiryDate) === "Expired"
                      ? "expired"
                      : "expiring"
                  }>
                    {getStatus(product.expiryDate)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpiryAlerts;
