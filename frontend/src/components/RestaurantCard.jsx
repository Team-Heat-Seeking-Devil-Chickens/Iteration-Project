import React from 'react';

//deconstruct passed down info prop
const RestaurantCard = ({ info }) => {
  const {} = info;

  return (
    <div>
      <h1>{'Restaurant Name'}</h1>
      <h2>{'Cuisine'}</h2>
      <p>{'Price Tier'}</p>
    </div>
  );
};

export default RestaurantCard;
