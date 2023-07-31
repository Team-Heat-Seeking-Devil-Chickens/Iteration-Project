import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice'
import RestaurantCard from '../components/RestaurantCard.jsx';
//import that slice of state here

const RestaurantDisplay = () => {
  //get the updated array of Restaurants from state
  const restaurant = useSelector((state) => state.restaurants.restList);
  // here can we initialize restaurant to get request to all restaurants?

  // restaurant
  //create an array to store all of the different RestaurantCards
  const displayArray = [];

  //iterate through the array of Restaurant objects
  restaurant.forEach(el => {
    <RestaurantCard info={el} />
  })
    //create an instance of Restaurant Card for each object
    //pass the object down as a prop

  return (

  );
};
