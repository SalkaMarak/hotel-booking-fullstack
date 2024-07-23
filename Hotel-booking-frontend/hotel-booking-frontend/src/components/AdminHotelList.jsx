import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllHotels, deleteHotelById } from '../services/ServiceConfig';

const AdminHotelList = () => {
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
      setFilteredHotels(response.data);  // Initialize filtered hotels
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
    <div className="hotel-list">
      <h2>Hotel List</h2>
      <hr/>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <hr/>
      <div className="hotel-list-container">
        {filteredHotels.map(hotel => (
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
            <Link to={`/admin/hotels/${hotel.id}/rooms`} className="btn btn-primary">View Rooms</Link>
            <Link to={`/add-room/${hotel.id}`} className="btn btn-primary">Add Room</Link>
            <button onClick={() => handleDeleteHotel(hotel.id)} className="btn btn-danger">Delete Hotel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHotelList;
