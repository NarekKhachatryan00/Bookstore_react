import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
        <h1>Bookstore</h1>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/basket">Basket</Link>
        </div>
    </nav>
  );
};

export default Navbar;