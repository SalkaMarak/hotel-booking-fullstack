import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomsByHotelId, getHotelById } from '../services/ServiceConfig'; // Import the new API call
import '../css/roomlist.css'; // Import the CSS file

const RoomList = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    fetchRooms();
    //fetchHotelName();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const response = await getRoomsByHotelId(hotelId);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // const fetchHotelName = async () => {
  //   try {
  //     const response = await getHotelById(hotelId);
  //     setHotelName(response.data.name);
  //   } catch (error) {
  //     console.error("Error fetching hotel name:", error);
  //   }
  // };

  return (
    <div className="room-list">
      {/* <h2>Room List for {hotelName || 'Loading...'}</h2> */}
      <h2 style={{margin: "20px 0 20px 10px", color: 'black'}}>Rooms Available</h2>
      <div className="room-list-container">
        {rooms.map(room => {
          const pricePerNight = room.pricePerNight;
          return (
            <div key={room.id} className="room-card">
              <h3>{room.roomType}</h3>
              <p><strong>Status:</strong> {room.booked ? 'Booked' : 'Available'}</p>
              <p><strong>Price Per Night:</strong> ${room.pricePerNight}</p>
              <div className="room-images">
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
