import React, { useState, useEffect } from 'react';

const CarSearch = ({ cars, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  // Update search results based on the search term
  useEffect(() => {
    const results = cars.filter((car) =>
      Object.values(car).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCars(results);
    onSearchResults(results); // Send filtered cars to parent component if needed
  }, [searchTerm, cars, onSearchResults]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="car-search">
      <input
        type="text"
        placeholder="Search by brand, model, year..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      <div className="search-results">
        {filteredCars.length ? (
          filteredCars.map((car, index) => (
            <div key={index} className="car-item">
              <h3>{car.brand} {car.model}</h3>
              <p>Year: {car.year}</p>
              <p>Location: {car.location}</p>
              <p>Price: {car.price}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
