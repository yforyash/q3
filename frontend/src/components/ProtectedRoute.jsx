import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import permissions from '../utils/rolePermissions';

const ROUTE_KEYS = {
  '/dashboard': 'dashboard',
  '/users': 'users',
  '/drivers': 'drivers',
  '/cabs': 'cabs',
  '/locations': 'locations',
};

const getStorageItem = (key) => {
  try { return localStorage.getItem(key); }
  catch { return null; }
};

const parseUser = () => {
  const val = getStorageItem('user');
  if (!val) return null;
  try { return JSON.parse(val); }
  catch { return null; }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getStorageItem('token');
  const user = parseUser();

  if (!token || !user || !user.role) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  const routeKey = ROUTE_KEYS[location.pathname];
  if (routeKey) {
    const allowed = permissions[user.role] || [];
    if (!allowed.includes(routeKey)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;