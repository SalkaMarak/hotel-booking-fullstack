import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels, deleteHotelById } from '../services/ServiceConfig';
import '../css/hotelmanagement.css';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotels();
      setHotels(response.data);
      setFilteredHotels(response.data);
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

  const handleDeleteHotel = async (hotelId) => {
    try {
      await deleteHotelById(hotelId);
      setHotels(hotels.filter(hotel => hotel.id !== hotelId));
      setFilteredHotels(filteredHotels.filter(hotel => hotel.id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="hotel-management">
      <div className="header">
        <h2>Hotel Management</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button onClick={handleSearchClick} className="search-button">Search</button>
        </div>
      </div>
      <div className="hotel-table">
        <div className="table-header">
          <div className="table-cell">ID</div>
          <div className="table-cell">Image</div>
          <div className="table-cell">Name</div>
          <div className="table-cell">Address</div>
          <div className="table-cell">Contact Info</div>
          <div className="table-cell">Description</div>
          <div className="table-cell">Amenities</div>
          <div className="table-cell">Actions</div>
        </div>
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => (
            <div key={hotel.id} className="table-row">
              <div className="table-cell">{hotel.id}</div>
              <div className="table-cell">
                {hotel.images.length > 0 && (
                  <img src={`data:image/jpeg;base64,${hotel.images[0]}`} alt="Hotel" className="hotel-image" />
                )}
              </div>
              <div className="table-cell">{hotel.name}</div>
              <div className="table-cell">{hotel.address}</div>
              <div className="table-cell">{hotel.contactInfo}</div>
              <div className="table-cell">{hotel.description}</div>
              <div className="table-cell">
                <ul>
                  {hotel.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
              <div className="table-cell">
                <Link to={`/admin/hotels/${hotel.id}/rooms`} className="btn btn-primary">View Rooms</Link>
                <Link to={`/add-room/${hotel.id}`} className="btn btn-primary">Add Room</Link>
                <button onClick={() => handleDeleteHotel(hotel.id)} className="btn btn-danger">Delete Hotel</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No hotels found.</div>
        )}
      </div>
    </div>
  );
};

export default HotelManagement;
