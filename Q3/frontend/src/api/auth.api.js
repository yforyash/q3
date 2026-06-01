import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const loginApi = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
};