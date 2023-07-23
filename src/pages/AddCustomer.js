import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { addCustomer } from '../redux/customersSlice';

function AddCustomer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      addCustomer({
        id: Math.floor(Math.random() * 1000),
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        avatar: '',
      })
    );
    history.push('/');
  };

  return (
    <div className="add-customer-container">
      <h2>Add New Customer</h2>
      <div>
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Customer
        </Button>
      </div>
    </div>
  );
}

export default AddCustomer;
