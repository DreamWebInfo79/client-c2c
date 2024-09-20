import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/all-cars');
        const fetchedCars = response.data.cars || [];
        const allCars = Object.values(fetchedCars).flat();
        setCars(allCars);
      } catch (error) {
        console.error('Failed to fetch car data', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars }}>
      {children}
    </CarContext.Provider>
  );
};
