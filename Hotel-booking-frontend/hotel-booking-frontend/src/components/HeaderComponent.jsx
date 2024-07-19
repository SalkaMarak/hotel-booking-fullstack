import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/HeaderComponent.css'; // Import your CSS file

const HeaderComponent = () => {
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const customerJSON = localStorage.getItem('customer');
    if (customerJSON) {
      const customer = JSON.parse(customerJSON);
      setCustomerName(customer.name);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleLogout = () => {
    localStorage.removeItem('customer'); // Clear the stored customer data
    setCustomerName(''); // Clear the customerName state
    window.location.href = '/customerLogin'; // Redirect to login page
  };

  return (
    <header className="header-container">
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to="/hotelList">Hotels</Link>
      </div>
      <div className="logo-container">
        <h2>HotelBooking</h2>
      </div>
      <div className="right-links">
        {customerName ? (
          <>
            <span>Welcome, {customerName}</span>
            <Link to="/bookingsList">My Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/customerLogin">Login</Link>
            <Link to="/customerRegistration">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
