// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminDashboard from './pages/AdminDashboard';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

function App() {
  return (
    <AuthProvider>
      <AppContainer>
        <Navbar />
        <Main>
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 🔒 Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* 🛡️ Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/edit-post/:id" element={<EditPostPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Main>
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
