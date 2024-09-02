import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './index.css';

const CarSearchForm = () => {
  const [budget, setBudget] = useState(0);
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');

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
    setBudget(value);
  };

  const marks = {
    0: '0L',
    2: '2L',
    5: '5L',
    10: '10L',
    15: '15L',
    20: '20L',
    25: '25L',
  };

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
          <Slider
            id="budgetSlider"
            min={0}
            max={25}
            marks={marks}
            step={null}
            onChange={handleBudgetChange}
            value={budget}
            className='slider-item'
          />
          <div>Selected Budget: {budget > 0 ? `${budget}L` : 'Select Budget'}</div>
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
