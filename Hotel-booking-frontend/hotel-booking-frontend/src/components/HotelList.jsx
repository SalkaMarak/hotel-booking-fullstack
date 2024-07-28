import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels } from '../services/ServiceConfig';
import '../css/hotellist.css';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotels();
      if (response && Array.isArray(response.data)) {
        setHotels(response.data);
        setFilteredHotels(response.data);
      } else {
        console.error('Unexpected data format:', response);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = hotels.filter(hotel =>
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="hotel-list-wrapper">
      <div className="header">
        <h2 className="hotel-list-title">Hotel List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input form-control"
          />
          <button onClick={handleSearchClick} className="search-button btn btn-primary">Search</button>
        </div>
      </div>
      <div className="hotel-list">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => (
            <div key={hotel.id} className="hotel-card card">
              <div className="card-body">
                <h3 className="card-title">{hotel.name}</h3>
                <p className="card-text"><strong>Address:</strong> {hotel.address}</p>
                <p className="card-text"><strong>Contact Info:</strong> {hotel.contactInfo}</p>
                <p className="card-text"><strong>Description:</strong> {hotel.description}</p>
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
                    <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Hotel Image ${index + 1}`} className="img-fluid" />
                  ))}
                </div>
                <Link to={`/rooms/${hotel.id}`} className="btn btn-primary">View Rooms</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
