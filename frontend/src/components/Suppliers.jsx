
import { useState } from "react";
import "./Suppliers.css";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Fresh Dairy Suppliers",
      phone: "9876543210",
      email: "freshdairy@gmail.com",
      address: "Coimbatore"
    },
    {
      id: 2,
      name: "Sri Grocery Traders",
      phone: "9876543211",
      email: "srigrocery@gmail.com",
      address: "Tiruppur"
    },
    {
      id: 3,
      name: "ABC Wholesale",
      phone: "9876543212",
      email: "abc@gmail.com",
      address: "Erode"
    }
  ]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addSupplier = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setMessage("Supplier name and phone are required.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    setSuppliers([
      ...suppliers,
      {
        ...form,
        id: Date.now()
      }
    ]);

    setForm({
      name: "",
      phone: "",
      email: "",
      address: ""
    });

    setMessage("Supplier added successfully!");
  };

  const deleteSupplier = (id) => {
    setSuppliers(
      suppliers.filter((supplier) => supplier.id !== id)
    );
    setMessage("Supplier deleted successfully.");
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="supplier-page">
      <h1>Suppliers Management</h1>
      <p>Manage your grocery store suppliers.</p>

      <div className="supplier-summary">
        <h3>Total Suppliers</h3>
        <h2>{suppliers.length}</h2>
      </div>

      <form className="supplier-form" onSubmit={addSupplier}>
        <h2>Add New Supplier</h2>

        <label>Supplier Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter supplier name"
        />

        <label>Phone Number *</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter 10-digit phone number"
          maxLength="10"
        />

        <label>Email Address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />

        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter supplier address"
        />

        <button type="submit">Add Supplier</button>

        {message && <p className="supplier-message">{message}</p>}
      </form>

      <div className="supplier-list">
        <h2>Supplier List</h2>

        <input
          className="supplier-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search suppliers..."
        />

        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email || "-"}</td>
                <td>{supplier.address || "-"}</td>
                <td>
                  <button
                    className="supplier-delete"
                    onClick={() => deleteSupplier(supplier.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredSuppliers.length === 0 && (
              <tr>
                <td colSpan="5">No suppliers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suppliers;
