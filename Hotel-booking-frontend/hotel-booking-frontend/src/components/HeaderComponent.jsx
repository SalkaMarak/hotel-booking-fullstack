import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/HeaderComponent.css'; 

const HeaderComponent = () => {
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        setUserName(user.name);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        console.error('Error parsing user JSON:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    setIsAdmin(false); 
    window.location.href = '/'; 
  };

  return (
    <header className="header-container container-fluid">
      <div className="left-links d-flex align-items-center">
        <Link to="/" className="nav-link text-white">Home</Link>
        <Link to={isAdmin ? "/hotelManagement" : "/hotelList"} className="nav-link text-white">Hotels</Link>
        {isAdmin && <Link to="/registerHotel" className="nav-link  text-white">Add Hotel</Link>}
      </div>
      <div className="logo-container text-center text-white">
        <h2><strong>FindHotels.com</strong></h2>
      </div>
      <div className="right-links d-flex align-items-center">
        {userName ? (
          <>
            <span className="navbar-text text-white">Welcome, {isAdmin ? 'Admin' : userName}</span>
            <Link to={isAdmin ? "/adminBookingsList" : "/bookingsList"} className="btn btn-outline-info btn-sm">
              {isAdmin ? "All Bookings" : "My Bookings"}
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
            <Link to="/registration" className="btn btn-outline-warning btn-sm">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
