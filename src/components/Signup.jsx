import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Signup({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipCode] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log('Type Username here', username);
    console.log('Type Password here', password);
    console.log('Type ZipCode here', zipcode);
    console.log('Button has been clicked to login');
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        zipcode,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              localStorage.setItem('cookieSSID', data._id);
              localStorage.setItem('zipcode', data.zipcode);
              setLoggedIn(true);
              return navigate('/restaurants');
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCreateAccount = () => {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        zipcode,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              localStorage.setItem('cookieSSID', data._id);
              localStorage.setItem('cookieSSID', data.zipcode);
              setLoggedIn(true);
              return navigate('/restaurants');
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        // Clear the session and log out the user
        localStorage.removeItem('cookieSSID');
        setLoggedIn(false);
      })
      .catch((err) => console.error(err));
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFD700', // Gold color
      },
      secondary: {
        main: '#ffffff', // White color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className='login'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}>
        <h1
          className='logTitle'
          style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          Team Chicken
        </h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '2rem',
          }}>
          <TextField
            label='Username'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label='Zip Code'
            variant='outlined'
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Button
            variant='contained'
            size='large' // Set the button size to 'large'
            onClick={handleSignUp}
            style={{ flex: 1, marginRight: '1rem' }}>
            Login
          </Button>
          <Button
            variant='contained'
            className='createAcct'
            size='large' // Set the button size to 'large'
            onClick={handleCreateAccount}
            style={{ flex: 1, marginRight: '1rem' }}>
            Create Account
          </Button>
          <Button
            variant='contained'
            size='large' // Set the button size to 'large'
            onClick={handleLogout}
            style={{ flex: 1 }}>
            Logout
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
