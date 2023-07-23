import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    fetchCustomersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchCustomersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCustomer: (state, action) => {
      const customerId = action.payload;
      state.list = state.list.filter((customer) => customer.id !== customerId);
    },
  },
});

export const {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  deleteCustomer, // Add the delete action to exports
} = customersSlice.actions;

export default customersSlice.reducer;
