import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
});


export const registerHotel = (formData) => {
  return axios.post(`${REST_API_BASE_URL}/hotels/register`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
};

export const getAllHotels = () => axios.get(REST_API_BASE_URL + '/hotels/all');

export const createRoom = (formData) => {
  return axiosInstance.post('/rooms/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getRoomsByHotelId = (hotelId) => {
  return axiosInstance.get(`/rooms/hotel/${hotelId}`);
};

export const createBooking = (bookingData) => {
  console.log("Booking Data:", bookingData); // Log the data being sent
  return axios.post(`${REST_API_BASE_URL}/bookings`, bookingData, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
};

export const getCustomerBookings = (customerId) => {
  return axiosInstance.get(`/bookings/user/${customerId}`);
};

export const getAllBookings = () => {
  return axiosInstance.get('/bookings');
};

export const reactivateBooking = (bookingId) => {
  return axiosInstance.post(`/bookings/reactivate/${bookingId}`);
};

export const cancelBooking = (bookingId) => {
  return axiosInstance.post(`/bookings/cancel/${bookingId}`);
};

export const getHotelById = (hotelId) => {
  return axiosInstance.get(`/hotels/${hotelId}`);
};

export const deleteHotelById = (id) => {
  return axiosInstance.delete(`/hotels/${id}`);
};

export const deleteRoom = (roomId) => {
  return axiosInstance.delete(`/rooms/${roomId}`);
};

// User registration
export const registerUser = (user) => {
  return axiosInstance.post('/users/register', user);
};

// Clear user details when logging out
export const logoutUser = () => {
  localStorage.removeItem('user'); // Remove user from localStorage
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    return response;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};
