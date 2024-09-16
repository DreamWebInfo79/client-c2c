import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Styled Components
const PageWrapper = styled.div`
  /* padding: 20px; */
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  text-align: center;
`;

const AddUser = ({ onAddUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setSnackbarMessage('Both fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (formData.password.length < 6) {
      setSnackbarMessage('Password must be at least 6 characters long.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Send the data to the backend to add the user
      const response = await axios.post('http://localhost:3001/admin/register', formData);

      if (response.data.message) {
        setSnackbarMessage('User added successfully!');
        setSnackbarSeverity('success');
        setFormData({ email: '', password: '' }); // Reset the form
      } else {
        setSnackbarMessage('Failed to add user. Please try again.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while adding the user. Please try again.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <PageWrapper>
      <FormCard>
        <Title>Add User</Title>
        <UserForm onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Add User</Button>
        </UserForm>
      </FormCard>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
};

export default AddUser;
