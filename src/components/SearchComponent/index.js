import React, { useState } from 'react';
import './index.css'; // Assuming you will style this component with external CSS

const CarSearchPage = () => {
  const [location, setLocation] = useState('Bangalore');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2020);
  const [priceRange, setPriceRange] = useState(1000000);
  const [condition, setCondition] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [mileage, setMileage] = useState(15000);
  const [bodyType, setBodyType] = useState('');

  const handleSearch = () => {
    // Search logic goes here
    console.log({
      location, make, model, year, priceRange, condition, fuelType, transmission, mileage, bodyType
    });
  };

  return (
    <div className="car-search-page">
      <div className="search-header">
        <h2>Search for Cars</h2>
        <div className="location-search">
          <label htmlFor="location">Location</label>
          <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            {/* Add more locations */}
          </select>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label>Make</label>
          <select value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">Select Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Hyundai">Hyundai</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Select Model</option>
            <option value="Corolla">Corolla</option>
            <option value="Civic">Civic</option>
            <option value="Focus">Focus</option>
            <option value="Elantra">Elantra</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} min="1990" max={new Date().getFullYear()} />
        </div>

        <div className="filter-group">
          <label>Price Range: ₹0 to ₹20 Lacs</label>
          <input type="range" min="0" max="2000000" step="10000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
          <p>Selected Price: ₹{priceRange.toLocaleString()}</p>
        </div>

        <div className="filter-group">
          <label>Condition</label>
          <div className="condition-options">
            <button className={condition === 'New' ? 'selected' : ''} onClick={() => setCondition('New')}>New</button>
            <button className={condition === 'Used' ? 'selected' : ''} onClick={() => setCondition('Used')}>Used</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Fuel Type</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Transmission</label>
          <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Mileage (up to): {mileage} km</label>
          <input type="range" min="0" max="100000" step="1000" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>Body Type</label>
          <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
            <option value="">Select Body Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>
      </div>

      <div className="search-button">
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default CarSearchPage;
