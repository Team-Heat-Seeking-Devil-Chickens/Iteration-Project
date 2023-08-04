// RestaurantDisplay.jsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { Grid, Container, Typography, Menu, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Signup from '../components/Signup';
// Function to fetch restaurants from the API
const RestaurantDisplay = ({ user, setUser, username, setUsername }) => {
  // const restaurant = useSelector((state) => state.restaurants.restList);
  const dispatch = useDispatch();
  const zipcode = Cookies.get('zipcode');

  const [location, setLocation] = useState(zipcode); // State variable for location
  const [searchLocation, setSearchLocation] = useState('');
  const [term, setTerm] = useState(''); // State variable for restaurant term
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meters, setMeters] = useState(10000);
  const [price, setPrice] = useState('1,2,3,4');
  const [category, setCategory] = useState('');
  const [mileLabel, setMileLabel] = useState('20');

  const milesToMeters = (e) => {
    const miles = e.target.value;
    setMileLabel(miles);
    const convertToMeters = miles * 1609;
    setMeters(convertToMeters);
  };

  const handleCuisine = (e) => {
    const cuisine = e.target.value;
    console.log(cuisine);
    setCategory(cuisine);
  };

  const handlePrice = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };

  const getDollarSigns = (price) => {
    const numberOfDollarSigns = price.split(',').length;
    const newLabel = '$'.repeat(numberOfDollarSigns);
    setPriceLabel(newLabel);
    console.log(priceLabel);
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipcode: location,
          radius: meters,
          categories: category,
          price: price,
        }),
      });
      const data = await response.json();
      console.log('fetched');
      setRestaurant(data.businesses);
      setLoading(false);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [searchLocation, meters, price, category]);

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
    return <div>Loading...</div>;
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setSearchLocation(location);
    }
  };

  const inputProps = {
    style: {
      color: 'white',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography
          style={{ color: 'white' }}
          variant="h4"
          align="center"
          sx={{ my: 4, color: '#ffffff' }}
        >
          Discover Restaurants Near You
        </Typography>

        <div
          className="query-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px',
            borderColor: 'white',
          }}
        >
          <TextField
            style={{
              border: '1px',
              borderColor: 'white',
            }}
            id="outlined-search"
            label="Location"
            type="search"
            InputProps={inputProps}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleEnterPress}
          />

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: '500px',
                padding: '20px',
              }}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Distance
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mileLabel}
                    label="Distance"
                    InputProps={inputProps}
                    onChange={milesToMeters}
                  >
                    <MenuItem value={5}>5 miles</MenuItem>
                    <MenuItem value={10}>10 miles</MenuItem>
                    <MenuItem value={15}>15 miles</MenuItem>
                    <MenuItem value={20}>20 miles</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Cuisine"
                    InputProps={inputProps}
                    onChange={handleCuisine}
                  >
                    <MenuItem value={'mexican'}>Mexican</MenuItem>
                    <MenuItem value={'indian'}>Indian</MenuItem>
                    <MenuItem value={'american'}>American</MenuItem>
                    <MenuItem value={'italian'}>Italian</MenuItem>
                    <MenuItem value={'chinese'}>Chinese</MenuItem>
                    <MenuItem value={'korean'}>Korean</MenuItem>
                    <MenuItem value={'japanese'}>Japanese</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={''}
                    label="Price"
                    InputProps={inputProps}
                    onChange={handlePrice}
                  >
                    <MenuItem value={'1'}>$</MenuItem>
                    <MenuItem value={'1,2'}>$$</MenuItem>
                    <MenuItem value={'1,2,3'}>$$$</MenuItem>
                    <MenuItem value={'1,2,3,4'}>$$$$</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>

        <Grid container spacing={3} alignItems="stretch">
          {restaurant.map((el, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RestaurantCard
                info={el}
                user={user}
                setUser={setUser}
                username={username}
                setUsername={setUsername}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default RestaurantDisplay;
