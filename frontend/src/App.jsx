
import { useState } from 'react';

import Products from './components/Products';
import Categories from './components/Categories';
import StockManagement from './components/StockManagement';
import ExpiryAlerts from './components/ExpiryAlerts';
import Suppliers from './components/Suppliers';
import PurchaseOrders from './components/PurchaseOrders';
import Reports from './components/Reports';

import './App.css';

function App() {
  const [page, setPage] = useState('Dashboard');

  const menuItems = [
    'Dashboard',
    'Products',
    'Categories',
    'Stock Management',
    'Expiry Alerts',
    'Suppliers',
    'Purchase Orders',
    'Reports'
  ];

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>🛒 Kirana Store</h2>

        <nav>
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className={page === item ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setPage(item);
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className="main-content">

        {page === 'Products' ? (
          <Products />

        ) : page === 'Categories' ? (
          <Categories />

        ) : page === 'Stock Management' ? (
          <StockManagement />

        ) : page === 'Expiry Alerts' ? (
          <ExpiryAlerts />

        ) : page === 'Suppliers' ? (
          <Suppliers />

        ) : page === 'Purchase Orders' ? (
          <PurchaseOrders />

        ) : page === 'Reports' ? (
          <Reports />

        ) : page === 'Dashboard' ? (

          <>
            <header>
              <div>
                <h1>Dashboard</h1>
                <p>
                  Welcome to your Kirana Store Management System!
                </p>
              </div>

              <span>Admin 👤</span>
            </header>

            <section className="stats">

              <div className="card">
                <h3>Total Products</h3>
                <h1>250</h1>
              </div>

              <div className="card">
                <h3>Available Stock</h3>
                <h1>1,250</h1>
              </div>

              <div className="card warning">
                <h3>Low Stock</h3>
                <h1>12</h1>
              </div>

              <div className="card danger">
                <h3>Expiring Soon</h3>
                <h1>8</h1>
              </div>

            </section>

            <section className="products">
              <h2>Welcome to your store dashboard!</h2>
              <p>
                Select a module from the sidebar to manage your store.
              </p>
            </section>
          </>

        ) : (

          <section className="products">
            <h1>{page}</h1>
            <p>This module is under development.</p>
          </section>

        )}

      </main>
    </div>
  );
}

export default App;
