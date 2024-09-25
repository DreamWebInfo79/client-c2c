import React, { useState, useContext } from 'react';
import { CarContext } from '../CarContext';
import { logEvent } from '../../analytics';
import './index.css'; // Assuming you will style this component with external CSS

const CarSearchPage = () => {
  const { cars } = useContext(CarContext);

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
  const [filteredCars, setFilteredCars] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to manage showing results

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("search clicked")

    // Log search event with some details
    logEvent('search_car', { brand: make, city: location, budget: priceRange }, 'jk');

    // Filtering cars based on user-selected criteria
    const filteredCars = cars.filter((car) => {
      const isWithinBudget = car.price <= priceRange;
      const matchesLocation = location ? car.location === location : true;
      const matchesMake = make ? car.make === make : true;
      const matchesYear = year ? car.year >= year : true;
      const matchesCondition = condition ? car.condition === condition : true;
      const matchesFuelType = fuelType ? car.fuelType === fuelType : true;
      const matchesTransmission = transmission ? car.transmission === transmission : true;
      const matchesMileage = car.mileage <= mileage;
      const matchesBodyType = bodyType ? car.bodyType === bodyType : true;

      return (
        isWithinBudget &&
        matchesLocation &&
        matchesMake &&
        matchesYear &&
        matchesCondition &&
        matchesFuelType &&
        matchesTransmission &&
        matchesMileage &&
        matchesBodyType
      );
    });

    setFilteredCars(filteredCars); // Update filtered cars state
    setShowResults(true); // Show results if there are matching cars
  };

  return (
    <div className="car-search-page">
      {!showResults ? ( // Show search form if results are not displayed
        <>
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
              <label>Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1990"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="filter-group">
              <label>Price Range: ₹0 to ₹20 Lacs</label>
              <input
                type="range"
                min="0"
                max="2000000"
                step="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <p>Selected Price: ₹{parseInt(priceRange).toLocaleString()}</p>
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
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
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
        </>
      ) : (
        <div className="results-section">
          {filteredCars.length > 0 ? (
            <div>
              <h2>Found Cars:</h2>
              <ul>
                {filteredCars.map((car, index) => (
                  <li key={index}>
                    <h3>{car.make} {car.model} - ₹{car.price.toLocaleString()}</h3>
                    <p>{car.year}, {car.mileage} km, {car.condition}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>No cars match your search criteria.</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default CarSearchPage;
