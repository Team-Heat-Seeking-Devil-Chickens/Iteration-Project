import React from 'react';
import { createAction } from '@reduxjs/toolkit';
import type { Action } from '@reduxjs/toolkit';

const RestaurantQuery = () => {
  // create an action for one drop-down

  return (
    <div>
      <input type='text' id='zipCode' />
      <select name='Ambience' id='ambienceSelector'>
        <option value=''>select</option>
        <option value='date_night'>Date Night</option>
        <option value='trendy'>Trendy</option>
        <option value='litty'>Litty</option>
        <option value='friendly'>Friendly</option>
        <option value='country'>Country</option>
      </select>
      <select name='Cuisine' id='cuisineSelector'>
        <option value='mexican'>Mexican</option>
        <option value='indian'>Indian</option>
        <option value='american'>American</option>
        <option value='italian'>Italian</option>
        <option value='chinese'>Chinese</option>
        <option value='korean'>Korean</option>
        <option value='japanese'>Japanese</option>
      </select>
      <select name='Price' id='priceSelector'>
        <option value='exquisite'>Exquisite</option>
      </select>
      <input type='text' id='restaurantName' />
      <switch id='vegetarianOptions'> </switch>
      <select name='Location' id='locationRadius'></select>
      <select name='Group' id='groupSizeSelector'></select>
    </div>
  );
};

// fields:
