import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/HeaderComponent.css'; // Import your CSS file

const HeaderComponent = () => {
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const customerJSON = localStorage.getItem('customer');
    const adminJSON = localStorage.getItem('admin');

    if (customerJSON) {
      const customer = JSON.parse(customerJSON);
      setUserName(customer.name);
      setIsAdmin(false);
    } else if (adminJSON) {
      const admin = JSON.parse(adminJSON);
      setUserName(admin.name);
      setIsAdmin(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleLogout = () => {
    localStorage.removeItem('customer'); // Clear the stored customer data
    localStorage.removeItem('admin'); // Clear the stored admin data
    setUserName(''); // Clear the userName state
    setIsAdmin(false); // Reset admin status
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <header className="header-container">
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to={isAdmin ? "/adminHotelList" : "/hotelList"}>Hotels</Link>
      </div>
      <div className="logo-container">
        <h2>HotelBooking</h2>
      </div>
      <div className="right-links">
        {userName ? (
          <>
            <span>Welcome, {userName}</span>
            <Link to={isAdmin ? "/adminBookingsList" : "/bookingsList"}>My Bookings</Link>
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
