  import axios from 'axios';

  const BASE_URL = 'http://127.0.0.1:8000/api';

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  export const getCabs = async () => {
    const response = await axios.get(`${BASE_URL}/cabs`, getHeaders());
    return response.data;
  };

  export const createCab = async (data) => {
    const response = await axios.post(`${BASE_URL}/cabs`, data, getHeaders());
    return response.data;
  };

  export const updateCab = async (id, data) => {
    const response = await axios.put(`${BASE_URL}/cabs/${id}`, data, getHeaders());
    return response.data;
  };

  export const deleteCab = async (id) => {
    const response = await axios.delete(`${BASE_URL}/cabs/${id}`, getHeaders());
    return response.data;
  };