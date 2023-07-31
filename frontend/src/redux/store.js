import { configureStore } from '@reduxjs/toolkit'
import queryReducer from '../features/querySlice'
import restaurantsReducer from '../features/restaurantsSlice'
import reviewSlice from '../features/reviewSlice'

export const store = configureStore({
 reducer: {
  query: queryReducer,
  restaurants: restaurantsReducer,
  review: reviewSlice
 }
})