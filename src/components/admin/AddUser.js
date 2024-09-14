import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success message


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Send the data to the backend to add the user
      const response = await axios.post('http://localhost:3001/api/add-user', formData);

      if (response.data.success) {
        setSuccessMessage('User added successfully!');
        setError('');
        setFormData({ username: '', password: '' }); // Reset the form
      } else {
        setError('Failed to add user. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while adding the user. Please try again.');
    }
  };

  return (
    <PageWrapper>
      <FormCard>
        <Title>Add User</Title>
        <UserForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
    </PageWrapper>
  );
};

export default AddUser;
