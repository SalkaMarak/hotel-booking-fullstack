import React from 'react'

function Welcome() {
  return (
    <div className='welcome'>
      <h1>Welcome to Online Hotel Booking Site</h1>
      <p>go to sites:</p>
      <ul>
        <li><a href='/registration'>Register new user</a></li>
        <li><a href='/login'>User Login</a></li>
        {/* <li><a href='/adminLogin'>Admin Login</a></li> */}
        <li><a href='/registerHotel'>Register Hotel</a></li>
        <li><a href='/hotelList'>Hotel List</a></li>
      </ul>
    </div>
  )
}

export default Welcome
