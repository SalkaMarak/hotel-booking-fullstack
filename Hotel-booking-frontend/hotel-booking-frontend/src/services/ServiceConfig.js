import axios from "axios";
// /api/rooms
const REST_API_BASE_URL = 'http://localhost:8080/api';

export const registerHotel = (formData) => {
    return axios.post(REST_API_BASE_URL + '/hotels/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getAllHotels = () => axios.get(REST_API_BASE_URL + "/hotels/all");

export const registerUser = (user) => axios.post(REST_API_BASE_URL + "/new", user);

export const loginUser = (user) => axios.post(REST_API_BASE_URL);

export const createRoom = (formData) => {
    return axios.post(`${REST_API_BASE_URL}/rooms`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getRoomsByHotelId = (hotelId) => {
    return axios.get(`${REST_API_BASE_URL}/rooms/hotel/${hotelId}`);
  };
