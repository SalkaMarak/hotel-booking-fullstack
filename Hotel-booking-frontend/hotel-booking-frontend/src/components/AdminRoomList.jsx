import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomsByHotelId, deleteRoom, getHotelById } from '../services/ServiceConfig'; 
import '../css/roomlist.css'

const AdminRoomList = () => {
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
    } catch (error) {
      console.error("Error fetching rooms:", error.response ? error.response.data : error.message);
    }
  };

  const fetchHotelName = async () => {
    try {
      const response = await getHotelById(hotelId); 
      setHotelName(response.data.name); 
    } catch (error) {
      console.error("Error fetching hotel name:", error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2 style={{margin: "20px 0 20px 10px"}}>Rooms Available</h2>
      {/* <h2>Rooms for {hotelName || 'Loading...'}</h2> */}
      <div className="room-list-container">
        {rooms.map(room => (
          <div key={room.id} className="hotel-card">
            <h3>{room.roomType}</h3>
            <p><strong>Status:</strong> {room.isBooked ? 'Booked' : 'Available'}</p>
            <p><strong>Price Per Night:</strong> {room.pricePerNight}</p>
            <div className="hotel-images">
              {room.images.map((image, index) => (
                <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Room Image ${index + 1}`} />
              ))}
            </div>
            <button onClick={() => handleDeleteRoom(room.id)} className="btn btn-danger">
              Delete Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoomList;
