import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getDrivers = async () => {
  const response = await axios.get(`${BASE_URL}/drivers`, getHeaders());
  return response.data;
};

export const createDriver = async (data) => {
  const response = await axios.post(`${BASE_URL}/drivers`, data, getHeaders());
  return response.data;
};

export const updateDriver = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/drivers/${id}`, data, getHeaders());
  return response.data;
};

export const deleteDriver = async (id) => {
  const response = await axios.delete(`${BASE_URL}/drivers/${id}`, getHeaders());
  return response.data;
};