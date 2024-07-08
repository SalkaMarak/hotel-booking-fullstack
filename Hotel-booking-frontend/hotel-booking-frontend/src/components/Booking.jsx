import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookRoom } from '../services/ServiceConfig';

const Booking = () => {
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    roomId: roomId,
    checkInDate: '',
    checkOutDate: '',
    totalCost: '',
    customerName: '',
    customerEmail: ''
  });
  const [bookingError, setBookingError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalCost = () => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const days = (checkOut - checkIn) / (1000 * 3600 * 24);
    // Replace with actual price per night from room details or passed from RoomList
    const pricePerNight = 100; 
    setFormData({ ...formData, totalCost: days * pricePerNight });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await bookRoom(formData);
      alert('Room booked successfully!');
      // Optionally, redirect or perform other actions after booking
    } catch (error) {
      console.error("Error booking room:", error);
      setBookingError("Error booking room. Please try again."); // Example error handling
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Room</h2>
      <form onSubmit={handleBooking} className="booking-form">
        <label>
          Check-in Date:
          <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
        </label>
        <label>
          Check-out Date:
          <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
        </label>
        <button onClick={calculateTotalCost}>Calculate Total Cost</button>
        <p>Total Cost: {formData.totalCost}</p>
        <label>
          Customer Name:
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} />
        </label>
        <label>
          Customer Email:
          <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />
        </label>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
      {bookingError && <p className="error-message">{bookingError}</p>}
    </div>
  );
};

export default Booking;
