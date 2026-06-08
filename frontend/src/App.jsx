import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import DriverManagement from './pages/DriverManagement';
import CabManagement from './pages/CabManagement';
import LocationManagement from './pages/LocationManagement';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to='/dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='drivers' element={<DriverManagement />} />
          <Route path='cabs' element={<CabManagement />} />
          <Route path='locations' element={<LocationManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

