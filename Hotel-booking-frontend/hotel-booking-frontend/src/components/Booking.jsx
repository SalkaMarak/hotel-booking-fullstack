import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking } from '../services/ServiceConfig';

const BookingForm = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        customerName: '',
        customerEmail: ''
    });

    // Fetch customer data from localStorage
    const customerJSON = localStorage.getItem('customer');
    const customer = customerJSON ? JSON.parse(customerJSON) : null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if customer data exists in localStorage
        if (!customer) {
            console.error('Customer data not found in localStorage');
            return;
        }

        const bookingData = {
            ...formData,
            roomId: parseInt(roomId),
            customerId: customer.id  // Use customer id from localStorage
        };

        try {
            const response = await createBooking(bookingData);
            console.log('Booking created:', response.data);
            navigate('/welcome'); // Navigate to another page after successful booking
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="registration">
            <div className="booking-form">
                <h2>Book Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="checkInDate">Check-in Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="checkInDate"
                            name="checkInDate"
                            value={formData.checkInDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="checkOutDate">Check-out Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="checkOutDate"
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerEmail">Customer Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
