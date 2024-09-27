// CarDashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import CarTable from './CarTable';
import AddCarForm from './AddCarForm';
import UserTable from './UserTable';
import AddUser from './AddUser';
import LoginPage from './LoginPage';
import { cars } from '../CarDetails/cars';

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

const CarDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('table');
  const [carData, setCarData] = useState(cars);

  const handleDelete = (index) => {
    const updatedData = carData.filter((_, i) => i !== index);
    setCarData(updatedData);
  };

  const handleAddCar = (newCar) => {
    setCarData([...carData, newCar]);
  };

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
      </Sidebar>

      <Content>
        {activeSection === 'table' && <CarTable carData={carData} handleDelete={handleDelete} />}
        {activeSection === 'addCar' && <AddCarForm onSubmit={handleAddCar} />}
        {activeSection === 'userTable' && <UserTable />}
        {activeSection === 'addUser' && <AddUser />}
      </Content>
    </PageWrapper>
  );
};

export default CarDashboard;
