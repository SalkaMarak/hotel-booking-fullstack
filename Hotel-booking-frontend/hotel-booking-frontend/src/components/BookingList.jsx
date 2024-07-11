import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/bookings');
            setBookings(response.data); // Assuming your API returns an array of booking objects
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div>
            <h2>All Bookings</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Total Cost</th>
                        <th>Cancellation Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.customerName}</td>
                            <td>{booking.customerEmail}</td>
                            <td>{booking.totalCost}</td>
                            <td>{booking.cancellationStatus ? 'Cancelled' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsList;
