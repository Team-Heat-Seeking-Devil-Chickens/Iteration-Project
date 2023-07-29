import React from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import RestaurantCard from '../components/RestaurantCard.jsx';
//import that slice of state here

const RestaurantDisplay = () => {
  //get the updated array of Restaurants from state
  const restaurant = useSelector((state) => state.restaurantsArray);
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
