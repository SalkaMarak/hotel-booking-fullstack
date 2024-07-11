import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomsByHotelId } from '../services/ServiceConfig';

const RoomList = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const response = await getRoomsByHotelId(hotelId);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div className="hotel-list">
      <h2>Room List for Hotel ID: {hotelId}</h2>
      <div className="hotel-list-container">
        {rooms.map(room => {
          const pricePerNight = room.pricePerNight; // Store pricePerNight in a variable
          return (
            <div key={room.id} className="hotel-card">
              <h3>{room.roomType}</h3>
              <p><strong>Number of Rooms Available:</strong> {room.numberOfRoomsAvailable}</p>
              <p><strong>Price Per Night:</strong> {room.pricePerNight}</p>
              <div className="hotel-images">
                {room.images.map((image, index) => (
                  <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Hotel Image ${index + 1}`} />
                ))}
              </div>
              <Link
                to={{
                  pathname: `/book-room/${room.id}`,
                  state: { pricePerNight } // Pass pricePerNight as state
                }}
                className="btn btn-primary"
              >
                Book Room
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomList;
