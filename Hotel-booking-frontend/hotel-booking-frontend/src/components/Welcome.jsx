import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/welcome.css';

function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome">
        <div className="overlay">
          <h2><bold>Welcome to Our Online Hotel Booking Site</bold></h2>
          <p>Find the best hotels at the best prices. Experience luxury and comfort by logging in above.</p>
        </div>
      </div>
      <div className="carousel-container">
        <div id="hotelCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Hotel 1"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Luxurious Stay</h5>
                <p>Experience the luxury and comfort of our premium hotels.</p>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Hotel 2"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Beautiful Views</h5>
                <p>Enjoy stunning views from our hotel rooms.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1682089297123-85459da8036b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Hotel 3"/>
              <div className="carousel-caption d-none d-md-block">
                <h5>World-class Service</h5>
                <p>Our hotels offer world-class service and amenities.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#hotelCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#hotelCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="experience-section">
        <h2>Experience the Best of Our Services</h2>
        <p>At our hotels, we prioritize your comfort and satisfaction. Enjoy a range of amenities designed to make your stay unforgettable.</p>
        <ul>
          <li>24/7 Customer Service</li>
          <li>Luxurious Rooms and Suites</li>
          <li>Gourmet Dining</li>
          <li>Fitness Centers and Spas</li>
          <li>Prime Locations</li>
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
