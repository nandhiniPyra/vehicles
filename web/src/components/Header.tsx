// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            Logo
          </Link>
        </Typography>
        <Button color='inherit'>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </Button>
        <Button color='inherit'>
          <Link
            to='/services'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Services
          </Link>
        </Button>
        <Button color='inherit'>
          <Link
            to='/contacts'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Contacts
          </Link>
        </Button>
        <Button color='inherit'>
          <Link
            to='/gallery'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Gallery
          </Link>
        </Button>
        {isAuthenticated ? (
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color='inherit' onClick={login}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
