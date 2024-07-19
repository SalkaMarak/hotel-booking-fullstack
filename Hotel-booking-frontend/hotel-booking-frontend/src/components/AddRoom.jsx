import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoom } from '../services/ServiceConfig';

const AddRoom = () => {
    const [formData, setFormData] = useState({
        roomType: '',
        pricePerNight: '',
        images: [],
    });
    const { hotelId } = useParams();
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

        const roomDetails = {
            roomType: formData.roomType,
            pricePerNight: formData.pricePerNight,
            hotelId: hotelId
        };

        const formDataToSend = new FormData();
        formDataToSend.append('room', new Blob([JSON.stringify(roomDetails)], { type: "application/json" }));

        formData.images.forEach(file => {
            formDataToSend.append('images', file);
        });

        try {
            const response = await createRoom(formDataToSend);
            console.log('Room created:', response.data);
            navigate('/hotelList');
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div className="registration">
            <div className="add-room">
                <h2>Add Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="roomType">Room Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pricePerNight">Price Per Night</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pricePerNight"
                            name="pricePerNight"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Add Room</button>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;
