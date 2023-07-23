import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { deleteCustomer } from '../redux/customersSlice';

const DeleteCustomer = () => {
  const dispatch = useDispatch();
  const { customerId } = useParams();

  // Fetch the customer data from the Redux store based on the customerId
  const customerData = useSelector((state) =>
    state.customers.list.find((customer) => customer.id === parseInt(customerId))
  );

  const handleDelete = () => {
    // Dispatch the deleteCustomer action with the customerId
    dispatch(deleteCustomer(customerId));
  };

  if (!customerData) {
    // If the customer with the given ID is not found, display an error message
    return <div>Error: Customer not found</div>;
  }

  return (
    <div>
      <h2>Delete Customer: {customerData.first_name} {customerData.last_name}</h2>
      <p>Are you sure you want to delete this customer?</p>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/">
        Cancel
      </Button>
    </div>
  );
};

export default DeleteCustomer;
