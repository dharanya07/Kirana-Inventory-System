# PROJECT REPORT
## Kirana Store Inventory & Expiry Alert System

### 1. Introduction
The Kirana Store Inventory & Expiry Alert System is a web-based application developed to help small grocery stores manage their inventory efficiently. It helps users monitor product quantities and identify expired or soon-to-expire products.

### 2. Objectives
- Simplify grocery product management.
- Monitor available stock.
- Identify low-stock products.
- Track product expiry dates.
- Demonstrate DevOps practices and cloud deployment.

### 3. Technologies Used
| Component | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | Python, Flask |
| Database | SQLite |
| Version Control | Git, GitHub |
| CI | GitHub Actions |
| Backend Hosting | Render |
| Frontend Hosting | Vercel |

### 4. System Modules
1. Dashboard
2. Product Management
3. Category Management
4. Stock Management
5. Expiry Alerts
6. Supplier Management
7. Purchase Orders
8. Reports

### 5. DevOps Implementation
- Git and GitHub are used for source code management.
- GitHub Actions automates frontend build verification and backend syntax checking.
- Render hosts the Flask backend.
- Vercel hosts the React frontend.
- The frontend communicates with the backend through REST API endpoints.

### 6. Testing
The deployed application was tested for:
- Loading existing products.
- Adding new products.
- Deleting products.
- Refreshing the page and checking saved products.
- Checking the live frontend and backend.

### 7. Project Links
**Live Application:**  
https://kirana-inventory-system.vercel.app/

**GitHub Repository:**  
https://github.com/dharanya07/Kirana-Inventory-System

**Backend API:**  
https://kirana-inventory-system.onrender.com/api/products

### 8. Conclusion
The project demonstrates how a web application can be developed and deployed using modern development and DevOps tools. It provides basic inventory and expiry monitoring features while demonstrating version control, continuous integration, API communication, and cloud hosting.

### 9. Future Enhancements
- User login and authentication.
- Barcode scanning.
- Automated expiry notifications.
- Advanced sales and inventory reports.
- Persistent cloud database storage.