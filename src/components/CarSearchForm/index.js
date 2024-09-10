import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import 'rc-slider/assets/index.css';
import './index.css';


const CarSearchForm = () => {
  const [budget, setBudget] = useState([1, 20]);
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
    { value: 5, label: '5L' },
    { value: 10, label: '10L' },
    { value: 15, label: '15L' },
    { value: 20, label: '20L+' }
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
    event.preventDefault();
    // Your submit logic
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
              max={20}
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
