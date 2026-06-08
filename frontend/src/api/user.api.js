import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`, getHeaders());
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/users`, data, getHeaders());
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, data, getHeaders());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`, getHeaders());
  return response.data;
};