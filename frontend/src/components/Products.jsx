
import { useState, useEffect } from 'react';
import './Products.css';

const API = 'https://kirana-inventory-system.onrender.com/api/products';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Grocery');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiry, setExpiry] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from Render backend
  async function fetchProducts() {
    try {
      setError('');

      const response = await fetch(API);

      if (!response.ok) {
        throw new Error('Unable to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Cannot connect to backend. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to database
  async function addProduct(e) {
    e.preventDefault();

    if (!name.trim() || quantity === '' || price === '' || !expiry) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          category,
          quantity: Number(quantity),
          price: Number(price),
          expiry
        })
      });

      if (!response.ok) {
        throw new Error('Unable to add product');
      }

      const newProduct = await response.json();

      setProducts(prevProducts => [...prevProducts, newProduct]);

      setName('');
      setCategory('Grocery');
      setQuantity('');
      setPrice('');
      setExpiry('');

      alert('Product added successfully!');
    } catch (err) {
      alert('Could not add product. Please try again.');
    }
  }

  // Delete product from database
  async function deleteProduct(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Unable to delete product');
      }

      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== id)
      );

      alert('Product deleted successfully!');
    } catch (err) {
      alert('Could not delete product. Please try again.');
    }
  }

  // Search products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate stock and expiry status
  function getStatus(product) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiryDate = new Date(product.expiry + 'T00:00:00');

    const daysLeft = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) return 'Expired';
    if (daysLeft <= 30) return 'Expiring Soon';
    if (product.quantity <= 15) return 'Low Stock';

    return 'Available';
  }

  return (
    <div className="products-page">
      <h1>Product Management</h1>
      <p>Add and manage your grocery store products.</p>

      <form className="product-form" onSubmit={addProduct}>
        <h2>Add New Product</h2>

        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Grocery</option>
          <option>Dairy</option>
          <option>Snacks</option>
          <option>Beverages</option>
          <option>Personal Care</option>
        </select>

        <label>Quantity</label>
        <input
          type="number"
          min="0"
          placeholder="Enter quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />

        <label>Expiry Date</label>
        <input
          type="date"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          required
        />

        <button type="submit">+ Add Product</button>
      </form>

      <div className="product-list">
        <h2>Product List</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {loading && <p>Loading products...</p>}

        {error && (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
            <button type="button" onClick={fetchProducts}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>₹{product.price}</td>
                    <td>{product.expiry}</td>
                    <td>{getStatus(product)}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
