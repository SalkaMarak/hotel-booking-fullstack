import React, { useState } from 'react';
import { registerHotel } from '../services/ServiceConfig';
import { useNavigate } from 'react-router-dom';

const HotelRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactInfo: '',
        description: '',
        amenities: '',
        images: [],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'images') {
            setFormData({
                ...formData,
                images: Array.from(e.target.files)
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const hotelDetails = {
            name: formData.name,
            address: formData.address,
            contactInfo: formData.contactInfo,
            description: formData.description,
            amenities: formData.amenities.split(",").map(item => item.trim()), 
        };

        const formDataToSend = new FormData();
        formDataToSend.append('hotel', new Blob([JSON.stringify(hotelDetails)], { type: "application/json" }));

        formData.images.forEach(file => {
            formDataToSend.append('images', file);
        });

        try {
            const response = await registerHotel(formDataToSend);
            console.log(response);
            console.log("Registered successfully");
            navigate("/hotelList")
        } catch (error) {
            console.error(error);
        }
    };

    return (
       <div className="registration">
        <div className="hotel-registration">
            <h2>Hotel Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Hotel Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactInfo">Contact Information</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amenities">Amenities</label>
                    <textarea
                        className="form-control"
                        id="amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        required
                    />
                </div>
                <hr/>
                <div className="form-group">
                    <label htmlFor="images">Upload Images (JPEG, PNG only)</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png"
                        multiple
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Register Hotel</button>
                <a href="/welcome">Go to Home</a>
            </form>
        </div>
       </div>
    );
};

export default HotelRegistration;
