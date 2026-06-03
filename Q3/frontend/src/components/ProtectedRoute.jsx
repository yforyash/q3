import React from 'react';
import { Navigate } from 'react-router-dom';

const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const parseUser = () => {
  const value = getStorageItem('user');
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = getStorageItem('token');
  const user = parseUser();

  if (!token || !user || !user.role) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;