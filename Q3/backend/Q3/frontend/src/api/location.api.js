import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getLocations = async () => {
  const response = await axios.get(`${BASE_URL}/locations`, getHeaders());
  return response.data;
};

export const createLocation = async (data) => {
  const response = await axios.post(`${BASE_URL}/locations`, data, getHeaders());
  return response.data;
};

export const updateLocation = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/locations/${id}`, data, getHeaders());
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await axios.delete(`${BASE_URL}/locations/${id}`, getHeaders());
  return response.data;
};