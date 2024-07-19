import React from 'react'

function Welcome() {
  return (
    <>
    <div className='welcome'>
      <h1>Welcome to Online Hotel Booking Site</h1>
      {/* <p>go to sites:</p>
      <ul>
        <li><a href='/registration'>Register new user</a></li>
        <li><a href='/login'>User Login</a></li>
        <li><a href='/registerHotel'>Register Hotel</a></li>
        <li><a href='/hotelList'>Hotel List</a></li>
        <li><a href='/customerRegistration'>Customer Registration</a></li>
        <li><a href='/customerLogin'>Customer Login</a></li>
      </ul> */}
      <hr/>
      <div className="div" style={{display:'flex', gap: '1rem'}}>
          <form action="/customerLogin">
              <input type="submit" value="Customer Login" />
          </form>
          <form action="/customerLogin">
              <input type="submit" value="Manager Login" />
          </form>
      </div>
    </div>
    </>
  )
}

export default Welcome
