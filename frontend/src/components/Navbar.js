import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>🌴 Kalinajaya Travel</h2>
        </div>
        
        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/tours">Tours</a></li>
          <li><a href="/booking">Booking</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/login" className="btn-login">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
