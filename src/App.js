import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import ClientsPage from './pages/ClientsPage';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';

function App() {
  const [modal, setModal] = useState(null);

  const openModal = (content) => setModal(content);
  const closeModal = () => setModal(null);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Welcome to Our Car Sales Management</h1>
          <p>Your one-stop solution for managing cars, clients, products, and sales.</p>
        </header>

        <nav className="app-nav">
          <ul>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/clients">Clients</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/sales">Sales</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage openModal={openModal} />} />
          <Route path="/clients" element={<ClientsPage openModal={openModal} />} />
          <Route path="/products" element={<ProductsPage openModal={openModal} />} />
          <Route path="/sales" element={<SalesPage openModal={openModal} />} />
        </Routes>

        {modal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeModal}>&times;</button>
              {modal}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

const HomePage = () => (
  <div className="home-page">
    <h2>Welcome to Our System!</h2>
    <p>Manage your car sales efficiently and effectively with ease.</p>
    <button className="start-button">
      <Link to="/cars">Start Managing Cars</Link>
    </button>
  </div>
);

export default App;
