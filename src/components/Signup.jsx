import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

// const bcrypt = require('bcryptjs');

// TODO remove, this demo shouldn't need to reset the theme.


const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const SALT_WORK_FACTOR = 10;
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const email = data.get('email')
    const password = data.get('password')

    // const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // this.password = await bcrypt.hash(this.password, salt);
    // return next();
    const body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pw: password,
      }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };

    fetch('/signup', requestOptions)
      .then(response => response.json())
      .then((data) => {
        // If successful, store session, username and go to home
        if (data.err) alert('Username already exists.');
        else {
          localStorage.setItem('email', data.email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('error signing up: ', err);
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/system';
// import { useState } from 'react';

// // Create a styled component with animations
// const AnimatedBox = styled(Box)(({ theme, shouldmove }) => ({
//   width: '400x',
//   height: '200px',
//   borderRadius: '50px',
//   background: '#C99B30',
//   position: 'center',
//   overflow: 'hidden',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   transition: 'transform 2s', // Adjust speed as needed
//   transform: Boolean(shouldmove) ? 'translateX(100vw)' : 'translateX(0)',
// }));

// const Signup = () => {
//   const [move, setMove] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setMove(true);
//   };

//   return (
//     <AnimatedBox shouldmove={move}>
//       <form onSubmit={handleSubmit}>
//         <TextField label="Username" variant="filled" />
//         <TextField label="Password" type="password" variant="filled" />
//         <Button type="submit" variant="contained">Sign Up</Button>
//       </form>
//     </AnimatedBox>
//   );
// };

// export default Signup;