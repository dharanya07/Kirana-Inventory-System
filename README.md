# Kirana Store Inventory & Expiry Alert System

## Project Overview
The Kirana Store Inventory & Expiry Alert System is a web-based application designed to help small grocery stores manage products, monitor stock levels, and identify products approaching their expiry dates.

## Technologies Used
- Frontend: React.js and Vite
- Backend: Python and Flask
- Database: SQLite
- Version Control: Git and GitHub
- CI/CD: GitHub Actions
- Backend Deployment: Render
- Frontend Deployment: Vercel

## Features
- Product management
- Add and delete products
- Search products
- Track product quantities
- Monitor product expiry dates
- Expired product alerts
- Expiring soon alerts
- Low stock alerts
- Product availability status

## Project Links
- Live Website: https://kirana-inventory-system.vercel.app/
- GitHub Repository: https://github.com/dharanya07/Kirana-Inventory-System
- Backend API: https://kirana-inventory-system.onrender.com/api/products

## Project Structure
```text
Kirana_Inventory_Project/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   ├── package.json
│   └── index.html
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
└── README.md
```

## Installation and Execution

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## CI/CD
GitHub Actions is used to automate frontend build verification and backend Python syntax checking whenever code is pushed to GitHub.

## Deployment
- Frontend deployed using Vercel.
- Backend deployed using Render.
- Source code maintained in GitHub.

## Conclusion
This project demonstrates the practical use of web development, database management, version control, continuous integration, and cloud deployment to solve inventory management problems in small grocery stores.
