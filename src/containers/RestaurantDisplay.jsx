// RestaurantDisplay.jsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { Grid, Container, Typography, Menu,Button, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Signup from '../components/Signup';
// Function to fetch restaurants from the API
const RestaurantDisplay = ({ user, setUser, username, setUsername}) => {
  // const restaurant = useSelector((state) => state.restaurants.restList);
  const dispatch = useDispatch();
  const zipcode = Cookies.get('zipcode');

  const [location, setLocation] = useState(zipcode); // State variable for location
  const [searchLocation, setSearchLocation] = useState('')
  const [term, setTerm] = useState(''); // State variable for restaurant term
  const [radius, setRadius] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [miles, setMiles] = useState(0);
  // const [kilometers, setKilometers] = useState(0);
  const [meters, setMeters] = useState(2000);

  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log(zipcode)
  console.log(username)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    
  };


  
  // const handleMilesChange = (e) => {
  //   const inputMiles = parseFloat(e.target.value);
  //   setMiles(inputMiles);
  
  // }

const milesToMeters = (e) => {
  const miles = e.target.value
  const convertToMeters = miles * 1609.34;
  setMeters(convertToMeters);
}
  // const zipcodeCookie = parseInt(Cookies.get('zipcode'));
  // setZipcode(zipcodeCookie);
  // console.log("user: ", user);
 

  
  

  // useEffect(() => {
  //   setLocation(zipcode);
    
  // }, [])

  const fetchRestaurants = async () => {
    try {
      //testing query

      const response = await fetch('/restaurant',
      {method:"POST",
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({zipcode: location, distance: meters}),
  });
      const data = await response.json();
      console.log("fetched");
      setRestaurant(data.businesses); // []
      console.log(data.businessess)
      setLoading(false);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };
    // useEffect(()=>{
    //  const restaurantArr = []
    //   restaurant.forEach((el, index) => (
    //     restaurantArr.push(<Grid item xs={12} sm={6} md={4} key={index}>
    //       <RestaurantCard info={el} />
    //     </Grid>)
    //   ))
    // },[restaurant]);

    useEffect(() => {
      fetchRestaurants();
    }, []);

    useEffect(() => {
      fetchRestaurants();
    }, [searchLocation, meters]);

  //  make a Post request
  // location, radius, category, term
  // Customize Material UI theme
  // {businesses: [{}, {}, {}]
  // response.businesses
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

  if (loading) {
    return <div>Loading...</div>
  }

const handleEnterPress = (e) => {
  if (e.key === 'Enter') {
    setSearchLocation(location);
  }
}


  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h4' align='center' sx={{ my: 4 }}>
          Discover Restaurants Near You
        </Typography>

        <div>
          <input
            type='text'
            placeholder='Enter Location...'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown = {handleEnterPress}
          />
          <input
            type='text'
            placeholder='Enter Restaurant Term...'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown = {handleEnterPress}
          />
          <button onClick={fetchRestaurants}>Search</button>
          <div>
          <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Distance
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      ><MenuItem value={5} onClick={milesToMeters}>5 Miles</MenuItem>
        <MenuItem value={10} onClick={milesToMeters}>10 Miles</MenuItem>
        <MenuItem value={15} onClick={milesToMeters}>15 Miles</MenuItem>
        <MenuItem value={20} onClick={milesToMeters}>20 Miles</MenuItem>
        <MenuItem value={25} onClick={milesToMeters}>25 Miles</MenuItem>
      </Menu>
    </div>


          </div>
        </div>

        <Grid container spacing={3} alignItems='stretch'>
        {restaurant.map((el, index) => (

      <Grid item xs={12} sm={6} md={4} key={index}>
          <RestaurantCard info={el} user={user} setUser={setUser} username = {username} setUsername = {setUsername} />
        </Grid>))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default RestaurantDisplay;
