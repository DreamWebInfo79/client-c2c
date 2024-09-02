import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import 'rc-slider/assets/index.css';
import './index.css';


const CarSearchForm = () => {
  const [budget, setBudget] = useState(0);
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [value, setValue] = useState([2, 30]);

  const handleBrandOptionChange = (event) => {
    setSelectBrandValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const renderCityOptions = () => (
    <>
      <option value="">Select District</option>
      {/* Your city options go here */}
    </>
  );

  const handleBudgetChange = (value) => {
    setValue(value);
  };


  function valuetext(value) {
    return `${value}L`;
  }

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
              marks={value}
              min={1}
              max={25}
              getAriaValueText={valuetext}
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
