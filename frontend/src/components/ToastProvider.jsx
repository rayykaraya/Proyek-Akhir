// src/components/ToastProvider.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';

function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
          fontSize: '16px',
        },
        success: {
          style: {
            background: '#28a745',
          },
        },
        error: {
          style: {
            background: '#dc3545',
          },
        },
      }}
    />
  );
}

export default ToastProvider;