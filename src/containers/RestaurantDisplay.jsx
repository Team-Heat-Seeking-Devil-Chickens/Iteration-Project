// RestaurantDisplay.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { Grid, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Function to fetch restaurants from the API
const RestaurantDisplay = () => {
  // const restaurant = useSelector((state) => state.restaurants.restList);
  const dispatch = useDispatch();

  const [location, setLocation] = useState(''); // State variable for location
  const [term, setTerm] = useState(''); // State variable for restaurant term
  const [radius, setRadius] = useState('');

  const [restaurant, setRestaurant] = useState('');

  const fetchRestaurants = async () => {
    try {
      const API_KEY = 'API_KEY'; //

      // Use the state values for location and term
      // const url = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&radius=${radius}`;
      const response = await fetch('/restaurants', {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const data = await response.json();

      setRestaurant(data.businesses);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [location, term]);
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
          />
          <input
            type='text'
            placeholder='Enter Restaurant Term...'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button onClick={fetchRestaurants}>Search</button>
        </div>

        <Grid container spacing={3} alignItems='stretch'>
          {restaurant.map((el, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RestaurantCard info={el} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default RestaurantDisplay;
