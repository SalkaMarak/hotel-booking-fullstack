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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* </HeaderComponent> */}
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
          </Routes>
        {/* </FooterComponent> */}
      </BrowserRouter>
    </>
  )
}

export default App
