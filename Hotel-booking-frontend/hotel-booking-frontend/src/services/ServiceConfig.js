import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api'; // Define the base URL for your API

// Define your API calls here
export const registerHotel = (formData) => {
    return axios.post(`${REST_API_BASE_URL}/hotels/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getAllHotels = () => axios.get(`${REST_API_BASE_URL}/hotels/all`);

export const registerCustomer = (customer) => axios.post(`${REST_API_BASE_URL}/customers/register`, customer);
export const loginCustomer = (user) => axios.post(`${REST_API_BASE_URL}/customers/login`, user);

export const registerUser = (user) => axios.post(`${REST_API_BASE_URL}/new`, user);

// export const loginUser = (user) => axios.post(`${REST_API_BASE_URL}`);

export const createRoom = (formData) => {
    return axios.post(`${REST_API_BASE_URL}/rooms/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getRoomsByHotelId = (hotelId) => {
    return axios.get(`${REST_API_BASE_URL}/rooms/hotel/${hotelId}`);
};

export const bookRoom = (bookingData) => {
    return axios.post(`${REST_API_BASE_URL}/bookings`, bookingData);
};

export const createBooking = (bookingData) => {
    return axios.post(`${REST_API_BASE_URL}/bookings`, bookingData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getCustomerBookings = (customerId) => {
    return axios.get(`${REST_API_BASE_URL}/bookings/customer/${customerId}`);
};

export const loginManager = (credentials) => {
    return axios.post(`${REST_API_BASE_URL}/managers/login`, credentials);
};
  
export const getAllBookings = () => {
    return axios.get(`${REST_API_BASE_URL}/bookings`);
};

export const cancelBooking = (bookingId) => {
    return axios.post(`${REST_API_BASE_URL}/bookings/cancel/${bookingId}`);
};

export const getHotelById = (hotelId) => {
    return axios.get(`${REST_API_BASE_URL}/hotels/${hotelId}`); // Adjust endpoint as needed
  };