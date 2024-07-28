import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking } from '../services/ServiceConfig';
import '../css/form.css'

const BookingForm = () => {
    const { roomId } = useParams();
    console.log(roomId);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        customerName: '',
        customerEmail: ''
    });

    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            console.error('user data not found in localStorage');
            return;
        }

        const bookingData = {
            ...formData,
            roomId: parseInt(roomId),
            userId: user.id  
        };

        try {
            const response = await createBooking(bookingData);
            console.log('Booking created:', response.data);
            navigate('/hotelList'); 
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="form-container">
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