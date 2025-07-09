import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaPenAlt, FaTools } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: #2d3748;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #a0aec0;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Brand to="/">MERN Blog</Brand>
      <NavLinks>
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <NavLink to="/create-post">
                  <FaPenAlt /> Create Post
                </NavLink>
                {/* ✅ Admin Panel link */}
                <NavLink to="/admin">
                  <FaTools /> Admin Panel
                </NavLink>
              </>
            )}
            <NavLink to="/profile">
              <FaUser /> {user.username}
            </NavLink>
            <Button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
