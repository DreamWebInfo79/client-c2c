import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import 'rc-slider/assets/index.css';
import './index.css';
import { logEvent } from '../../analytics';
import { CarContext } from '../CarContext';

const CarSearchForm = () => {
  const { cars , setCars } = useContext(CarContext);
  const [budget, setBudget] = useState([1, 50]);
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [value, setValue] = useState([2, 30]);
  const states = [
    "Any", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleBrandOptionChange = (event) => {

    setSelectBrandValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const renderCityOptions = () => (
    <>
      <option value="">Select State</option>
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </>
  );

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue); // Update the budget state with the selected range
  };


  function valuetext(value) {
    return `${value}L`;
  }

  const marks = [
    { value: 1, label: '1L' },
    { value: 10, label: '10L' },
    { value: 20, label: '20L' },
    { value: 30, label: '30L' },
    { value: 40, label: '40L' },
    { value: 50, label: '50L+' }
  ];

  
  const renderBrandOptions = () => (
    <>
      <option value="">Select Brand</option>
      <option value="Maruti">Maruti</option>
      <option value="Hyundai">Hyundai</option>
      <option value="Honda">Honda</option>
      <option value="Toyota">Toyota</option>
      <option value="Ford">Ford</option>
    </>
  );

  const handleSubmit = (event) => {
    logEvent('search_car', { brand: selectBrandValue, city: cityValue, budget: budget[0] },'jk');
    event.preventDefault();
    const filteredCars = cars.filter((car) => {
      const isWithinBudget = car.price >= budget[0] && car.price <= budget[1];
      const matchesBrand = selectBrandValue ? car.brand === selectBrandValue : true;
      const matchesCity = cityValue ? car.city === cityValue : true;

      return isWithinBudget && matchesBrand && matchesCity;
    });

    setCars(filteredCars);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="car-search-form">
      <h2>Select Car Options</h2>
      <form>
        <div>
          <select
            id="selectOption"
            value={selectBrandValue}
            onChange={handleBrandOptionChange}
            className='select-item'
          >
            {renderBrandOptions()}
          </select>
        </div>
        <div className="slider-container">
          <label htmlFor="budgetSlider" className="label-slider-item">Select Budget</label>
          <Box sx={{ width: 300 }}>
          <Slider
              value={budget}
              onChange={handleBudgetChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={1}
              max={50}
              step={1}
              marks={marks}
            />
          </Box>
          <div>Selected Budget: {budget[0]}L - {budget[1]}L</div>
        </div>
        <div>
          <select
            id="selectOptionCity"
            value={cityValue}
            onChange={handleCityChange}
            className='select-item'
          >
            {renderCityOptions()}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="search-button">Search</button>
      </form>
    </div>
  );
};

export default CarSearchForm;
