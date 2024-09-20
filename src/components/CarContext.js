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

  const handleStateSelect = (state) => {
    console.log(state)
    console.log(cars);
    const filteredCars = cars.filter((car) => car.location.toLowerCase() === state.toLowerCase());
    setCars(filteredCars);
    console.log(filteredCars);
  };

  return (
    <CarContext.Provider value={{ cars, handleStateSelect }}>
      {children}
    </CarContext.Provider>
  );
};
