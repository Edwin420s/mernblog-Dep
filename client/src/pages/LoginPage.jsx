// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    border-color: #4299e1;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2d3748;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #4a5568;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #db4437;
  color: white;
  border: none;
  border-radius: 0.375rem;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #c23321;
  }
`;

export default function LoginPage() {
  const { login, loginWithGoogle, error } = useAuth(); // Make sure loginWithGoogle is implemented
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧪 Step 1: Confirm request payload sent from frontend
    console.log('📤 Submitting credentials:', credentials);

    try {
      await login(credentials);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorText>{error}</ErrorText>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>
      </form>

      <GoogleButton onClick={handleGoogleLogin}>
        Sign in with Google
      </GoogleButton>
    </Container>
  );
}
