import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Welcome from './components/Welcome'
import AdminLogin from './components/AdminLogin'
import HotelRegistration from './components/HotelRegistration'
import HotelList from './components/HotelList'
import AddRoom from './components/AddRoom'
import RoomList from './components/RoomList'
import Booking from './components/Booking'
import BookingsList from './components/BookingList'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import CustomerRegistration from './components/CustomerRegistration'
import CustomerLogin from './components/CustomerLogin'
import AdminRegister from './components/AdminRegister'
import AdminHotelList from './components/AdminHotelList'
import AdminBookingsList from './components/AdminBookingList'
import AdminRoomList from './components/AdminRoomList'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route path="/welcome" element = { <Welcome/> } ></Route>
            <Route path="/" element = { <Welcome/> } ></Route>
            <Route path="/registration" element = { <Registration/> } ></Route>
            <Route path="/login" element = { <Login/> } ></Route>
            <Route path="/adminLogin" element = { <AdminLogin/> } ></Route>
            <Route path="/registerHotel" element = { <HotelRegistration/> } ></Route>
            <Route path="/hotelList" element = { <HotelList/> } ></Route>
            <Route path="/add-room/:hotelId" element={<AddRoom />} />
            <Route path="/rooms/:hotelId" element={<RoomList />} />
            <Route path="/book-room/:roomId" element={<Booking />} />
            <Route path="/customerRegistration" element={< CustomerRegistration />} />
            <Route path="/adminRegistration" element={< AdminRegister />} />
            <Route path="/adminHotelList" element={< AdminHotelList />} />
            <Route path="/adminBookingsList" element={ <AdminBookingsList />} />
            <Route path="/bookingsList" element={<BookingsList />} />
            <Route path="/customerRegistration" element={<CustomerRegistration />} />
            <Route path="/customerLogin" element={<CustomerLogin />} />
            <Route path="/admin/hotels/:hotelId/rooms" element={<AdminRoomList />} />
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
