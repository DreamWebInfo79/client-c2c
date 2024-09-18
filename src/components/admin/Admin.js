// CarDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CarTable from './CarTable';
import AddCarForm from './AddCarForm';
import UserTable from './UserTable';
import AddUser from './AddUser';
import LoginPage from './LoginPage';
import ContactTable from './ContactTable';
import axios from 'axios';

const PageWrapper = styled.div`
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  gap: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#007bff' : 'transparent')};
  &:hover {
    background-color: #007bff;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  /* height: 100%; */
`;

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('table');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <PageWrapper>
      <Sidebar>
        <SidebarItem active={activeSection === 'table'} onClick={() => setActiveSection('table')}>
          Cars
        </SidebarItem>
        <SidebarItem active={activeSection === 'addCar'} onClick={() => setActiveSection('addCar')}>
          Add Car
        </SidebarItem>
        <SidebarItem active={activeSection === 'userTable'} onClick={() => setActiveSection('userTable')}>
          Users
        </SidebarItem>
        <SidebarItem active={activeSection === 'addUser'} onClick={() => setActiveSection('addUser')}>
          Add Users
        </SidebarItem>
        <SidebarItem active={activeSection === 'contactTable'} onClick={() => setActiveSection('contactTable')}>
          Contact Users
        </SidebarItem>
      </Sidebar>

      <Content>
        {activeSection === 'table' && <CarTable />}
        {activeSection === 'addCar' && <AddCarForm />}
        {activeSection === 'userTable' && <UserTable />}
        {activeSection === 'addUser' && <AddUser />}
        {activeSection === 'contactTable' && <ContactTable />}
      </Content>
    </PageWrapper>
  );
};

export default Admin;
