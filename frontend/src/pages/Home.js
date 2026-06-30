import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <section className="tours-section">
        <h2>Popular Tours</h2>
        <p>Check out our most popular tour packages</p>
        
        <div className="tours-grid">
          <div className="tour-card">
            <img src="https://via.placeholder.com/300x200?text=Bali+Tour" alt="Bali Tour" />
            <div className="tour-info">
              <h3>Bali Beach Tour</h3>
              <p>5 days / 4 nights</p>
              <p className="price">$450</p>
              <button className="btn-book">Book Now</button>
            </div>
          </div>

          <div className="tour-card">
            <img src="https://via.placeholder.com/300x200?text=Jakarta+Tour" alt="Jakarta Tour" />
            <div className="tour-info">
              <h3>Jakarta City Tour</h3>
              <p>3 days / 2 nights</p>
              <p className="price">$300</p>
              <button className="btn-book">Book Now</button>
            </div>
          </div>

          <div className="tour-card">
            <img src="https://via.placeholder.com/300x200?text=Lombok+Tour" alt="Lombok Tour" />
            <div className="tour-info">
              <h3>Lombok Island Tour</h3>
              <p>4 days / 3 nights</p>
              <p className="price">$400</p>
              <button className="btn-book">Book Now</button>
            </div>
          </div>

          <div className="tour-card">
            <img src="https://via.placeholder.com/300x200?text=Yogyakarta+Tour" alt="Yogyakarta Tour" />
            <div className="tour-info">
              <h3>Yogyakarta Culture Tour</h3>
              <p>4 days / 3 nights</p>
              <p className="price">$380</p>
              <button className="btn-book">Book Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready for Your Next Adventure?</h2>
        <p>Contact us to customize your tour package</p>
        <button className="btn-contact">Contact Us</button>
      </section>
    </div>
  );
}

export default Home;
