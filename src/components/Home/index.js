import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiLocationOn } from 'react-icons/ci';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CarSearchForm from '../CarSearchForm';
import { videoGif } from '../../statesData';
import { logEvent } from '../../analytics';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [favourites, setFavourites] = useState({});
  const [activeTab, setActiveTab] = useState('All');
  const [cars, setCars] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const carBrands = [
    { name: 'All', logo: 'car-brand/all-car-bramd.webp' },
    { name: 'Toyota', logo: 'car-brand/toyota-logo-2020-europe-download.png' },
    { name: 'Honda', logo: 'car-brand/honda-rm-removebg-preview.png' },
    { name: 'Ford', logo: 'car-brand/ford-logo-2017-download.png' },
    { name: 'BMW', logo: 'car-brand/bmw-logo-2020-gray-download.png' },
    { name: 'Mercedes-Benz', logo: 'car-brand/benz-removebg-preview.png' },
    { name: 'Audi', logo: 'car-brand/audi-logo-2016-download.png' },
    { name: 'TATA', logo: 'car-brand/download-removebg-preview.png' },
    { name: 'Mahindra', logo: 'car-brand/mahindra-logo.png' },
  ];

  const visibleBrands = showAll ? carBrands : carBrands.slice(0, 6);
  const navigate = useNavigate();

  const toggleFavourite = (carId) => {
    logEvent('Car', 'Favourite', carId);
    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [carId]: !prevFavourites[carId],
    }));
  };

  // Filter cars based on activeTab
  // const filteredCars = activeTab === 'All' ? cars : cars.filter(car => car.brand === activeTab);

  // Fetch car data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/all-cars'); // Adjust the API URL as per your backend
        const fetchedCars = response.data.cars || [];
        const allCars = Object.values(fetchedCars).flat();
        setCars(allCars);
        // setCars(fetchedCars.Tata); 
        console.log(fetchedCars);
      } catch (error) {
        console.error('Failed to fetch car data', error);
      }
    };
    fetchCars();
  }, []);

  const style = {
    backgroundImage: `url(/video/car.gif)`, // Use the imported videoGif here
    backgroundSize: 'cover',
    height: '550px',
  };

  return (
    <div className="home-container">
      <div className="car-search-form-container" style={style}>
        <CarSearchForm />
      </div>
      <div className="car-container-main">
        <h1 className="car-container-heading">Popular Cars</h1>
        <div>
          <div className="tabs-container desktop">
            {visibleBrands.map((brand) => (
              <div
                key={brand.name}
                className={`tab ${activeTab === brand.name ? 'active' : ''}`}
                onClick={() => setActiveTab(brand.name)}
              >
                {brand.name === 'All' ? 'All CARS' : brand.name}
              </div>
            ))}
            {!showAll && (
              <div className="tab show-more" onClick={() => setShowAll(true)}>
                Show More
              </div>
            )}
          </div>

          {/* Mobile Container */}
          <div className="tabs-container-mobile">
            <div className="brands-grid">
              {visibleBrands.map((brand) => (
                <div
                  key={brand.name}
                  className={`brand-tab ${activeTab === brand.name ? 'active' : ''}`}
                  onClick={() => setActiveTab(brand.name)}
                >
                  <img className="brand-logo" src={brand.logo} alt={`${brand.name} logo`} />
                  <span className="brand-name">{brand.name}</span>
                </div>
              ))}
            </div>

            <div className="toggle-button" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'View Less Brands' : 'View More Brands'}
            </div>
          </div>
        </div>
        <div className="cars-brand-container-home">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                className="NewUcExCard posR"
                onClick={() => navigate(`/car/${car.brand}/${car.carId}`)}
                key={car.carId}
              >
                <div className="image_container posR">
                  <div className="imagebox hover">
                    <img
                      height={154}
                      width={284}
                      alt={car.model}
                      src={car.images[0]}
                      title={car.model}
                      className="car-image"
                    />
                  </div>
                </div>
                <div className="bottom_container">
                  <div className="title_heart_section">
                    <div className="titlebox hover">
                      <h3 className="title">
                        <a title={car.model} className="car-link">
                          {`${car.year} ${car.model}`}
                        </a>
                      </h3>
                      <div className="dotsDetails">
                        {`${car.year} • ${car.condition}`}
                      </div>
                    </div>
                    <div
                      id="shortlistHeartIcon"
                      className="shortlist NewUcrShortList"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating to the card
                        toggleFavourite(car.id);
                      }}
                    >
                      {favourites[car.id] ? <FaHeart /> : <FaRegHeart />}
                    </div>
                  </div>
                  <div className="Price hover">
                    <p className="car-price">{car.price}</p>
                  </div>
                  <div className="discounts" />
                  <div className="sellerdetail">
                    <div className="lead-btn-holder">
                      <button id="ucrVDP-ucButton-0" className="seller-button">
                        View More
                        <BiSolidRightArrowCircle />
                      </button>
                    </div>
                  </div>
                  <div className="distanceText">
                    <CiLocationOn />
                    {car.location}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No cars available for this brand.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
