import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  ambience: '',
  cuisine: '',
  priceTier: '',
  plantBase: '',
  locationRad: '',
  goodGroups: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      // action payload should be an array [query attricute, value]
      // invoke this function on onChange of the query selectors in Restaurant query --> i.e. onChange = (e) => dispatch(updateQuery(['ambience', e.target.value]))
      // if attribute is vegoptions or good fro groups, the data can be manipulated.
      //  may have to ensure that value is a num/bit ?
      const attribute = action.payload[0];
      const value = action.payload[1];
      state[attribute] = value;
    },
  },
});
