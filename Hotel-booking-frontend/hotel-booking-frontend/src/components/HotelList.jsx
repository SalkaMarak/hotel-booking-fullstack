import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../services/ServiceConfig';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotels();
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="hotel-list">
      <h2>Hotel List</h2>
      <div className="hotel-list-container">
        {hotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <h3>{hotel.name}</h3>
            <p><strong>Address:</strong> {hotel.address}</p>
            <p><strong>Contact Info:</strong> {hotel.contactInfo}</p>
            <p><strong>Description:</strong> {hotel.description}</p>
            <div className="amenities">
              <strong>Amenities:</strong>
              <ul>
                {hotel.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="hotel-images">
              {hotel.images.map((image, index) => (
                <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Hotel Image ${index + 1}`} />
              ))}
            </div>
            <Link to={`/rooms/${hotel.id}`} className="btn btn-primary">View Rooms</Link>
            <Link to={`/add-room/${hotel.id}`} className="btn btn-primary">Add Room</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
