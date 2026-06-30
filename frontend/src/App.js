import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌴 Kalinajaya Tour Travel 🌴</h1>
        <p>Welcome to our travel booking system</p>
      </header>
      
      <main className="App-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Explore Amazing Tours</h2>
            <p>Discover the best travel destinations with Kalinajaya Tour Travel</p>
            <button className="btn-primary">Browse Tours</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>🗺️ Best Destinations</h3>
            <p>Handpicked tours to amazing places around the world</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices</h3>
            <p>Competitive pricing with no hidden charges</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Safe & Secure</h3>
            <p>Secure payments and trusted by thousands</p>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Kalinajaya Tour Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
