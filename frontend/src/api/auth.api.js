import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const loginApi = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  const { token, user } = response.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return response.data;
};

export const registerApi = async (fields) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, fields);
  return response.data;
};

export const logoutApi = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const forgotPasswordApi = async (email) => {
  const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const resetPasswordApi = async (token, newPassword) => {
  const response = await axios.post(`${BASE_URL}/auth/reset-password`, { token, newPassword });
  return response.data;
};

export const changePasswordApi = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${BASE_URL}/auth/change-password`,
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};