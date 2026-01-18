import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand section */}
        <div className="brand-section">
          <div className="logo">
            <h2>a|x</h2>
          </div>
          <p className="brand-description">
            ALX is a platform where travelers can discover and book unique, comfortable, and affordable lodging options worldwide. From cozy city apartments and tranquil countryside retreats to exotic beachside villas. ALX connects you with the perfect place to stay for any trip.
          </p>
        </div>

        {/* Links sections */}
        <div className="footer-links">
          {/* Explore section */}
          <div className="links-column">
            <h3 className="column-title">Explore</h3>
            <ul className="links-list">
              <li>Apartments in Dubai</li>
              <li>Hotels in New York</li>
              <li>Villa in Spain</li>
              <li>Mansion in Indonesia</li>
            </ul>
          </div>

          {/* Company section */}
          <div className="links-column">
            <h3 className="column-title">Company</h3>
            <ul className="links-list">
              <li>About us</li>
              <li>Blog</li>
              <li>Career</li>
              <li>Customers</li>
              <li>Brand</li>
            </ul>
          </div>

          {/* Help section */}
          <div className="links-column">
            <h3 className="column-title">Help</h3>
            <ul className="links-list">
              <li>Support</li>
              <li>Cancel booking</li>
              <li>Refunds Process</li>
            </ul>
            <p className="help-note">
              Some hotel requires you to cancel more than 24 hours before check-in. Details here
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with policies */}
      <div className="footer-bottom">
        <div className="policies">
          <span>Terms of Service</span>
          <span>Policy service</span>
          <span>Cookies Policy</span>
          <span>Partners</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;