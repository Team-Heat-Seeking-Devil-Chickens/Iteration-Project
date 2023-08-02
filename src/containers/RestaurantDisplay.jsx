import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard.jsx';
//import that slice of state here

const RestaurantDisplay = () => {
  //get the updated array of Restaurants from state
  const restaurant = useSelector((state) => state.restaurants.restList);
  // here can we initialize restaurant to get request to all restaurants?
  const dispatch = useDispatch();
  // do a get request to all of our restaurants

  const fetchRestaurants = async () => {
    try {
      const backendUrl = 'http://localhost:3000/restaurants';
      const jsonData = await fetch(backendUrl);
      const restaurantData = await jsonData.json();
      dispatch(updateRest(restaurantData));
    } catch (err) {
      console.log(`There was an error fetching restaurant data: ${err}`);
    }
  };

  const getRestaurants = (address, radius, minRating, maxPriceLevel, minNumOfRatings) => {
    // Encode the address to include it as a URL parameter
    const encodedAddress = encodeURIComponent(address);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQxC9h6Cux5KqQ62OHTAAuAVptA194-bY`)
    .then(response => {
      // The latitude and longitude are located in 
      // response.data.results[0].geometry.location
      const location = response.data.results[0].geometry.location;
      console.log(`Latitude: ${location.lat}`);
      console.log(`Longitude: ${location.lng}`);

      // Now return the location so it can be used in the next then block
      return location;
    })
    .then(location => {
      return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${location.lat},${location.lng}`,  // use the lat/lng from the Geocoding API
          radius: radius,
          type: 'restaurant',
          key: 'AIzaSyAQxC9h6Cux5KqQ62OHTAAuAVptA194-bY'
        }
      });
    })
    .then(response => {
      const places = response.data.results;
      const filteredPlaces = places.filter(place => place.rating >= 4.5 && price_level <= maxPriceLevel && user_ratings_total <= minNumOfRatings); // place min 
      return Promise.all(filteredPlaces.map(restaurant => {
        return axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: restaurant.place_id,
            fields: 'reviews,rating,name,types',
            key: 'AIzaSyAQxC9h6Cux5KqQ62OHTAAuAVptA194-bY'
          }
        }).then(detailsResponse => {
          restaurant.details = detailsResponse.data.result;
          return restaurant;
        });
      }));
    })
    .then(restaurantsWithDetails => {
      console.log(restaurantsWithDetails);
    })
    .catch(error => {
      console.error(`Could not retrieve data: ${error}`);
    });
  }
  //example object: 
  /*
   {
    business_status: 'OPERATIONAL',
    geometry: { location: [Object], viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Ann Marie's Corned Beef",
    opening_hours: { open_now: false },
    photos: [ [Object] ],
    place_id: 'ChIJM4wnjP8hJYgRvYu8r3sQSnw',
    plus_code: {
      compound_code: 'J3HW+36 Clinton Township, MI, USA',
      global_code: '86JVJ3HW+36'
    },
    price_level: 1,
    rating: 4.5,
    reference: 'ChIJM4wnjP8hJYgRvYu8r3sQSnw',
    scope: 'GOOGLE',
    types: [ 'restaurant', 'food', 'point_of_interest', 'establishment' ],
    user_ratings_total: 40,
    vicinity: '21312 Hall Road, Clinton Township',
    details: {
      name: "Ann Marie's Corned Beef",
      rating: 4.5,
      reviews: [Array],
      types: [Array]
    }
  },
  */
  // fetchRestaurants();
  useEffect(() => {
    fetchRestaurants();
  }, [])

  // grab that data --> array of objects

  // invoke updateRest to update our restaurant state

  // restaurant
  //create an array to store all of the different RestaurantCards
  const displayArray = [];

  //iterate through the array of Restaurant objects
  restaurant.forEach((el, index) => {
    displayArray.push(<RestaurantCard key={index} info={el} />);
  });
  //create an instance of Restaurant Card for each object
  //pass the object down as a prop

  return <div className='resDisplay'>{displayArray}</div>;
};

export default RestaurantDisplay;
