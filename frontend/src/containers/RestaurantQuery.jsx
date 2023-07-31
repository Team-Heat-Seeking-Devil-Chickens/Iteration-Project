import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuery } from '../features/querySlice';

const RestaurantQuery = () => {
  // create an action for one drop-down
  const query = userSelector((state) => state.query);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type='text'
        id='restaurantName'
        onChange={(e) => dispatch(updateQuery(['name', e.target.value]))}
      />
      <select
        name='Cuisine'
        id='cuisineSelector'
        onChange={(e) => dispatch(updateQuery(['cuisine', e.target.value]))}
      >
        <option value=''>select</option>
        <option value='Mexican'>Mexican</option>
        <option value='Indian'>Indian</option>
        <option value='American'>American</option>
        <option value='Italian'>Italian</option>
        <option value='Chinese'>Chinese</option>
        <option value='Korean'>Korean</option>
        <option value='Japanese'>Japanese</option>
      </select>
      <select
        name='Ambience'
        id='ambienceSelector'
        onChange={(e) => dispatch(updateQuery(['ambience', e.target.value]))}
      >
        <option value=''>select</option>
        <option value='date night'>Date Night</option>
        <option value='trendy'>Trendy</option>
        <option value='litty'>Litty</option>
        <option value='friendly'>Friendly</option>
        <option value='country'>Country</option>
      </select>
      <select
        name='Price'
        id='priceSelector'
        onChange={(e) => dispatch(updateQuery(['priceTier', e.target.value]))}
      >
        <option value=''>select</option>
        <option value='exquisite'>Exquisite</option>
        <option value='splurge'>Splurge</option>
        <option value='affordable'>Affordable</option>
        <option value='thrifty'>Thrifty</option>
        <option value='dirt cheap'>Dirt Cheap</option>
      </select>
      <Input
        label='vegetarian/vegan options?'
        type='checkbox'
        name='plantBase'
        id='plantBase'
        format={(v) => v === '1'}
        normalize={(v) => (v ? '1' : '0')}
        onChange={(e) => dispatch(updateQuery(['plantBase', e.target.value]))}
      />
      <Input
        label='good for groups?'
        type='checkbox'
        name='goodGroups'
        id='goodGroups'
        format={(v) => v === '1'}
        normalize={(v) => (v ? '1' : '0')}
        onchange={(e) => dispatch(updateQuery(['goodGroups', e.target.value]))}
      />
      <select
        name='Location'
        id='locationRadius'
        onChange={(e) => dispatch(updateQuery(['locationRad', e.target.value]))}
      >
        <option value='5km'>5 km</option>
        <option value='10km'>10 km</option>
        <option value='15km'>15 km</option>
        <option value='20km'>20 km</option>
        <option value='25km'>25 km</option>
      </select>
      <select
        name='Group'
        id='groupSizeSelector'
        onChange={(e) => dispatch(updateQuery(['goodGroups', e.target.value]))}
      ></select>
    </div>
  );
};
/*
Location input field removed
 <input
  type='text'
  id='zipCode'
  placeholder='zipcode'
  onChange={(e) => dispatch(updateQuery(['zipCode', e.target.value]))}
/> */

// fields:
export default RestaurantQuery;
