import React from 'react';

//deconstruct passed down info prop
const RestaurantCard = ({ info }) => {
  const {name, ambience, cuisine, price_tier, plant_based, location_radius, good_for_groups} = info;

  return (
    <div className='resCard'>
      <h1>{name}</h1>
      <h2>Cuisine: {cuisine}</h2>
      <p>Price Tier: {price_tier}</p>
      <p>Ambience: {ambience}</p>
      <p>Plant-Based? {plant_based === '0' ? 'no' : 'yes'}</p>
      <p>Location Radius: {location_radius} km</p>
      <p>Good for Groups? {good_for_groups === '0' ? 'no' : 'yes'}</p>
      {/* <p>Nathan's Mom approves? yes</p> */}
    </div>
  );
};

export default RestaurantCard;
