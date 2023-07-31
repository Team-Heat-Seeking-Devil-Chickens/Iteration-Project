import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuery } from '../features/querySlice';



const RestaurantQuery = () => {
  // create an action for one drop-down
  const query = userSelector((state) => state.query);
  const dispatch = useDispatch();

  return (
    <div>
      <input type='text' id='zipCode' />
      <select name='Ambience' id='ambienceSelector' onChange={(e)=>dispatch(updateQuery(['ambience', e.target.value]))}>
        <option value=''>select</option>
        <option value='date_night'>Date Night</option>
        <option value='trendy'>Trendy</option>
        <option value='litty'>Litty</option>
        <option value='friendly'>Friendly</option>
        <option value='country'>Country</option>
      </select>
      <select name='Cuisine' id='cuisineSelector' onChange={(e)=>dispatch(updateQuery(['cuisine', e.target.value]))}>
        <option value='mexican'>Mexican</option>
        <option value='indian'>Indian</option>
        <option value='american'>American</option>
        <option value='italian'>Italian</option>
        <option value='chinese'>Chinese</option>
        <option value='korean'>Korean</option>
        <option value='japanese'>Japanese</option>
      </select>
      <select name='Price' id='priceSelector' onChange={(e)=>dispatch(updateQuery(['priceTier', e.target.value]))}>
        <option value='exquisite'>Exquisite</option>
      </select>
      <input type='text' id='restaurantName' onChange={(e)=>dispatch(updateQuery(['name', e.target.value]))}/>
      <switch id='vegetarianOptions'> </switch>
      <select name='Location' id='locationRadius' onChange={(e)=>dispatch(updateQuery(['locationRad', e.target.value]))}></select>
      <select name='Group' id='groupSizeSelector' onChange={(e)=>dispatch(updateQuery(['goodGroups', e.target.value]))}></select>
    </div>
  );
};

// fields:
