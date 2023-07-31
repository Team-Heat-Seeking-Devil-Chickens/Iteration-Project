import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 // here can we initialize this to all of our restaurants? or wait until user querys?
  restaurants: []

}


export const querySlice = createSlice({
 name: 'restaurants',
 initialState,
 reducers: {
  updateRest: (state, action) => {
   // action payload should be an array [query attricute, value]
    const attribute = action.payload[0];
    const value = action.payload[1];
    state[attribute] = value;
  }
 }
})

// export default querySlice;