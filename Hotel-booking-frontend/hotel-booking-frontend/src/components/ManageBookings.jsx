import React, { useState, useEffect } from 'react';
import { getAllBookings } from '../services/ServiceConfig';
import '../css/ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="manage-bookings">
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Room Type</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.room.hotelName}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.totalCost}</td>
              <td>{booking.cancellationStatus ? 'Cancelled' : 'Active'}</td>
              <td>{booking.customerName}</td>
              <td>{booking.customerEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
