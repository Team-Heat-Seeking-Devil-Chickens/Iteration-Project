import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 // here can we initialize this to all of our restaurants? or wait until user querys?
  restName: '',
  staffAtt: '',
  service: '',
  review: '',
  recommend: '',
  bathroom: '',

}


export const reviewSlice = createSlice({
 name: 'review',
 initialState,
 reducers: {
  updateReview: (state, action) => {
   // action payload should be an array [review attribute,  attricute, value]
    const attribute = action.payload[0];
    const value = action.payload[1];
    state[attribute] = value;
  }
 }
})