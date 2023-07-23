import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './App.css';
import logo from './logo.PNG';
import AddIcon from '@mui/icons-material/Add';
import { fetchCustomersStart, fetchCustomersSuccess, fetchCustomersFailure, deleteCustomer } from './redux/customersSlice';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DeleteCustomer from './pages/DeleteCustomer';
// App.js

function App() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.list);
  const loading = useSelector((state) => state.customers.loading);
  const error = useSelector((state) => state.customers.error);

  useEffect(() => {
    dispatch(fetchCustomersStart());

    //the API call to retrieve the list of customers
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((data) => dispatch(fetchCustomersSuccess(data.data)))
      .catch((error) => dispatch(fetchCustomersFailure(error.message)));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };

  return (
    <Router>
      <div className="app-body">
        <div className="left-section">
          <img className="left-section-logo" src={logo} alt="" />
          <div className='left-customer-button'>
            <Button variant="contained" color="success" size='small' startIcon={<PeopleAltIcon />}    >
              Customer
            </Button>
          </div>
        </div>
        <div className="right-section">
          <div className="right-section-heading">
            <h3>CUSTOMERS</h3>
          </div>
          <div className="right-section-button">
            <Button className="right-customer-button" variant="contained" color="success" startIcon={<AddIcon />}    >
              Add new Customer
            </Button>
          </div>
          <div className="right-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Picture</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <img src={customer.avatar} alt={`Avatar of ${customer.first_name} ${customer.last_name}`} />
                    </TableCell>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{`${customer.first_name} ${customer.last_name}`}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" size="small">
                        Edit
                      </Button>
                      <span style={{ marginLeft: '8px' }}></span>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(customer.id)} // Call handleDelete with the customer ID
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
