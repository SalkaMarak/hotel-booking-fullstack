import React, { useState, useEffect } from 'react';
import { getCustomerBookings, cancelBooking } from '../services/ServiceConfig';
import '../css/BookingList.css';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const customerId = JSON.parse(localStorage.getItem('customer')).id;

    useEffect(() => {
        fetchBookings();
    }, [customerId]);

    const fetchBookings = async () => {
        try {
            const response = await getCustomerBookings(customerId);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            fetchBookings();
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    return (
        <div className="bookings-list">
            <h2>Your Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Room Type</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.room.hotelName}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.totalCost}</td>
                            <td>{booking.cancellationStatus ? 'Cancelled' : 'Active'}</td>
                            <td>
                                {!booking.cancellationStatus && (
                                    <button onClick={() => handleCancelBooking(booking.id)}>
                                        Cancel Booking
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsList;
