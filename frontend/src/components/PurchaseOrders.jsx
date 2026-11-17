
import { useState } from 'react';
import './PurchaseOrders.css';

function PurchaseOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      supplier: 'Fresh Dairy Suppliers',
      date: '2026-11-15',
      items: 'Milk, Butter',
      amount: 2500,
      status: 'Pending'
    },
    {
      id: 2,
      supplier: 'Sri Grocery Traders',
      date: '2026-11-16',
      items: 'Rice, Sugar',
      amount: 4200,
      status: 'Received'
    }
  ]);

  const [supplier, setSupplier] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');

  const addOrder = (e) => {
    e.preventDefault();

    if (!supplier || !items.trim() || Number(amount) <= 0) {
      alert('Please enter valid order details.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      supplier,
      date: new Date().toISOString().slice(0, 10),
      items,
      amount: Number(amount),
      status: 'Pending'
    };

    setOrders([...orders, newOrder]);
    setSupplier('');
    setItems('');
    setAmount('');
  };

  const updateStatus = (id) => {
    setOrders(orders.map(order =>
      order.id === id
        ? { ...order, status: 'Received' }
        : order
    ));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="purchase-page">
      <h1>Purchase Orders</h1>
      <p>Manage orders placed with your suppliers.</p>

      <div className="purchase-summary">
        <div className="purchase-card">
          <h3>Total Orders</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="purchase-card">
          <h3>Pending Orders</h3>
          <h2>{orders.filter(o => o.status === 'Pending').length}</h2>
        </div>

        <div className="purchase-card">
          <h3>Received Orders</h3>
          <h2>{orders.filter(o => o.status === 'Received').length}</h2>
        </div>
      </div>

      <form className="purchase-form" onSubmit={addOrder}>
        <h2>Add Purchase Order</h2>

        <select
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          required
        >
          <option value="">Select Supplier</option>
          <option value="Fresh Dairy Suppliers">Fresh Dairy Suppliers</option>
          <option value="Sri Grocery Traders">Sri Grocery Traders</option>
          <option value="ABC Wholesale">ABC Wholesale</option>
        </select>

        <input
          type="text"
          placeholder="Items (e.g. Rice, Sugar)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Total Amount (₹)"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">+ Add Order</button>
      </form>

      <div className="purchase-table">
        <h2>Order List</h2>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>PO-{order.id.toString().slice(-4)}</td>
                <td>{order.supplier}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>₹{order.amount}</td>
                <td>
                  <span className={order.status === 'Received' ? 'received' : 'pending'}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === 'Pending' && (
                    <button onClick={() => updateStatus(order.id)}>
                      Mark Received
                    </button>
                  )}
                  <button className="delete-order" onClick={() => deleteOrder(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchaseOrders;
