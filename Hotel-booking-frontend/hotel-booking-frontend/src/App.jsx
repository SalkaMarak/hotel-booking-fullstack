// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import Welcome from './components/Welcome';
import HotelRegistration from './components/HotelRegistration';
import HotelList from './components/HotelList';
import AddRoom from './components/AddRoom';
import RoomList from './components/RoomList';
import Booking from './components/Booking';
import BookingsList from './components/BookingList';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import UserRegistration from './components/UserRegistration';
import HotelManagement from './components/HotelManagement';
import AdminBookingsList from './components/AdminBookingList';
import AdminRoomList from './components/AdminRoomList';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/registration" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/registerHotel" element={<HotelRegistration />} />
            <Route path="/hotelList" element={<HotelList />} />
            <Route path="/add-room/:hotelId" element={<AddRoom />} />
            <Route path="/rooms/:hotelId" element={<RoomList />} />
            <Route path="/book-room/:roomId" element={<Booking />} />
            <Route path="/hotelManagement" element={<HotelManagement />} />
            <Route path="/adminBookingsList" element={<AdminBookingsList />} />
            <Route path="/bookingsList" element={<BookingsList />} />
            <Route path="/admin/hotels/:hotelId/rooms" element={<AdminRoomList />} />
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
