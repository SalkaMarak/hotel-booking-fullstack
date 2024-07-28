import React from 'react';
import '../css/FooterComponent.css'; // Assuming you want to add custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top" style={{ textAlign: 'center', padding: '20px', borderBottom: '1px solid #ccc' }}>
        <a href="/about" className="footer-link">About</a> | 
        <a href="/terms" className="footer-link">Terms & Conditions</a> | 
        <a href="/privacy" className="footer-link">Privacy Policy</a> | 
        <a href="/contact" className="footer-link">Contact</a>
      </div>
      <div className="footer-bottom" style={{ textAlign: 'center', padding: '20px' }}>
        <p>FindHotels.com is part of a big Inc., the world leader in online travel and related services.</p>
        <p>Copyright © 2024 FindHotels.com™. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
