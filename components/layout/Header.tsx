import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Top section with logo and auth buttons */}
      <div className="header-top">
        <div className="logo">
          <h2>Overseas trip?</h2>
        </div>

        <div className="auth-buttons">
          <button className="auth-btn">Sign In</button>
          <button className="auth-btn sign-up">Sign Up</button>
        </div>
      </div>

      {/* Search bar section */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Get the latest information on travel guides"
            className="search-input"
          />
          <button className="search-btn">More Info</button>
        </div>

        <div className="location-checkout">
          <span className="location">Location</span>
          <span className="checkout">Check out</span>
        </div>
      </div>

      {/* Accommodation types */}
      <nav className="accommodation-types">
        <ul className="accommodation-list">
          <li className="accommodation-item">Tropical</li>
          <li className="accommodation-item">Apartment</li>
          <li className="accommodation-item">House</li>
          <li className="accommodation-item">Lakefront</li>
          <li className="accommodation-item">Farm house</li>
          <li className="accommodation-item">Treehouse</li>
          <li className="accommodation-item">Cabins</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;