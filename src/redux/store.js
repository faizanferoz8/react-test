// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './customersSlice';

const store = configureStore({
  reducer: {
    customers: customersReducer,
    // Add other reducers here if you have any
  },
});

export default store;
