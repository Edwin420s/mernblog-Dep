// src/pages/AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👨‍💼 Admin Dashboard</h1>
      <p>Welcome, {user?.firstName} {user?.lastName || ''}</p>

      <div>
        <p>You are logged in as: <strong>{user?.role}</strong></p>
        <p>You can manage posts, comments, and users here.</p>
      </div>
    </div>
  );
}
