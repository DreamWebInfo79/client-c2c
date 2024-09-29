import React, { useState } from 'react';
import { BsFilterRight } from "react-icons/bs";
import { Slider, Box, Typography } from '@mui/material';

import './index.css';

const CarFilter = () => {
  const [location, setLocation] = useState('Bangalore');
  const [searchTerm, setSearchTerm] = useState('');
  const [condition, setCondition] = useState('');
  const [carType, setCarType] = useState('');
  const [availability, setAvailability] = useState('');
  // const [priceRange, setPriceRange] = useState(1000000); // Default ₹10 Lacs
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [mileage, setMileage] = useState('');
  const [brand, setBrand] = useState(''); 
  const [priceRange, setPriceRange] = useState([100000, 5000000]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleSearch = () => {
    const filters = {
      location,
      searchTerm,
      condition,
      carType,
      availability,
      priceRange,
      fuelType,
      transmission,
      mileage,
      brand, // Include brand in filters
    };
    console.log('Applied Filters:', filters);
    // Make API calls or filter your car listings based on `filters`
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

  const formatPrice = (price) => {
    return price ? price.toLocaleString('en-IN') : 0;
  };


  return (
    <div className="filter-container">
    <div className='filter-header'>
      <BsFilterRight /> 
      <h2>Filters</h2>
    </div>

    <div className='filter-group-container-1'>
    <div>
      <select
        className="location-filter"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Delhi">Delhi</option>
        {/* Add more locations as needed */}
      </select>
    </div>


    <div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search up to 3 car brands or models"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div>

      {/* Add Brand Dropdown */}
      <select
        className="brand-filter"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        {renderBrandOptions()}
      </select>
    </div>

    </div>
    <div className='filter-group-container-2'>

      <div>
        <div className="filter-options">
          <div className="filter-group-radio">
            <input
              type="radio"
              id="new"
              name="condition"
              value="New"
              checked={condition === 'New'}
              onChange={(e) => setCondition(e.target.value)}
            />
            <label htmlFor="new">New</label>
          </div>

          <div className="filter-group-radio">
            <input
              type="radio"
              id="used"
              name="condition"
              value="Used"
              checked={condition === 'Used'}
              onChange={(e) => setCondition(e.target.value)}
            />
            <label htmlFor="used">Used</label>
          </div>

          {/* <div className="filter-group-radio">
            <input
              type="radio"
              id="certified"
              name="condition"
              value="Certified"
              checked={condition === 'Certified'}
              onChange={(e) => setCondition(e.target.value)}
            />
            <label htmlFor="certified">Certified</label>
          </div> */}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="filter-group">
      <Typography gutterBottom>Price Range: ₹0 to ₹50 Lacs</Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={100000}
          max={5000000}
          step={10000}
        />
      </Box>
      <Typography>
        Selected Price Range: ₹{formatPrice(priceRange[0])} to ₹{formatPrice(priceRange[1])}
      </Typography>
    </div>
      <div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>

      
    </div>
  );
};

export default CarFilter;
