// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('loggedInUser');

  if (!isLoggedIn) {
    // Tampilkan notifikasi dan arahkan ke halaman login
    toast.error('Anda harus login untuk mengakses halaman ini.');
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;