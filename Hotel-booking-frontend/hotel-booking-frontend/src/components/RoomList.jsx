import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomsByHotelId, getHotelById } from '../services/ServiceConfig'; // Import the new API call

const RoomList = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    fetchRooms();
    fetchHotelName(); 
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const response = await getRoomsByHotelId(hotelId);
      setRooms(response.data);
      console.log(rooms)
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchHotelName = async () => {
    try {
      const response = await getHotelById(hotelId); 
      setHotelName(response.data.name); 
      console.log(hotelName)
    } catch (error) {
      console.error("Error fetching hotel name:", error);
    }
  };

  return (
    <div className="hotel-list">
      <h2>Room List for {hotelName || 'Loading...'}</h2> {/* Show loading text until hotel name is fetched */}
      <div className="hotel-list-container">
        {rooms.map(room => {
          const pricePerNight = room.pricePerNight; // Store pricePerNight in a variable
          return (
            <div key={room.id} className="hotel-card">
              <h3>{room.roomType}</h3>
              <p><strong>Status:</strong> {room.booked ? 'Booked' : 'Available'}</p>
              <p><strong>Price Per Night:</strong> {room.pricePerNight}</p>
              <div className="hotel-images">
                {room.images.map((image, index) => (
                  <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Room Image ${index + 1}`} />
                ))}
              </div>
              {!room.booked && (
                <Link
                  to={{
                    pathname: `/book-room/${room.id}`,
                    state: { pricePerNight } // Pass pricePerNight as state
                  }}
                  className="btn btn-primary"
                >
                  Book Room
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomList;
