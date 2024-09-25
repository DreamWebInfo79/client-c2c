// LoginPage.js
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
`;

const LoginContainer = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginPage = ({ onLogin }) => {
  const { user ,updateUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const adminId = Cookies.get('c2cUserId');
    const role = Cookies.get('c2cUserRole');
    if (adminId && role === 'admin') {
      onLogin(); // Redirect or handle the logged-in state
    }
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to the login route
      const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/admin/login', {
        email,    // Send email and password in the request body
        password,
      });
      // console.log(response.data);
      // If login is successful, trigger onLogin and handle success response
      if (response.status===200) {
        updateUser({c2cUserEmail:email, c2cUserId:response.data.uniqueId, c2cUserRole:response.data.role});
        onLogin();

      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials');
      } else {
        console.error('Login error:', error);
        alert('Failed to log in');
      }
    }
  };
  return (
    <PageWrapper>
      <LoginContainer>
        <Heading>Admin Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </LoginContainer>
    </PageWrapper>
  );
};

export default LoginPage;
