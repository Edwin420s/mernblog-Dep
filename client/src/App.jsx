import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import styled from 'styled-components';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const EditPostPage = lazy(() => import('./pages/EditPostPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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
          {/* Suspense fallback during lazy loading */}
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </Main>
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
