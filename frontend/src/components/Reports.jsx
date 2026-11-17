
import './Reports.css';

function Reports() {
  const products = [
    { id: 1, name: 'Milk', category: 'Dairy', quantity: 10, expiry: '2026-11-18' },
    { id: 2, name: 'Biscuits', category: 'Snacks', quantity: 50, expiry: '2026-12-20' },
    { id: 3, name: 'Cooking Oil', category: 'Grocery', quantity: 5, expiry: '2027-05-10' },
    { id: 4, name: 'Curd', category: 'Dairy', quantity: 8, expiry: '2026-11-16' },
    { id: 5, name: 'Rice', category: 'Grocery', quantity: 40, expiry: '2027-08-15' }
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysLeft = (date) => {
    const expiryDate = new Date(date + 'T00:00:00');
    return Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStock = products.filter(p => p.quantity < 10).length;
  const expired = products.filter(p => getDaysLeft(p.expiry) < 0).length;
  const expiringSoon = products.filter(p => {
    const days = getDaysLeft(p.expiry);
    return days >= 0 && days <= 7;
  }).length;

  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>Overview of your Kirana Store inventory.</p>

      <div className="report-cards">
        <div className="report-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="report-card">
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div className="report-card warning">
          <h3>Low Stock</h3>
          <h2>{lowStock}</h2>
        </div>

        <div className="report-card danger">
          <h3>Expired Products</h3>
          <h2>{expired}</h2>
        </div>

        <div className="report-card warning">
          <h3>Expiring Soon</h3>
          <h2>{expiringSoon}</h2>
        </div>
      </div>

      <div className="report-table">
        <h2>Inventory Report</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => {
              const days = getDaysLeft(product.expiry);

              let status = 'Available';

              if (days < 0) {
                status = 'Expired';
              } else if (days <= 7) {
                status = 'Expiring Soon';
              } else if (product.quantity < 10) {
                status = 'Low Stock';
              }

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.expiry}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
