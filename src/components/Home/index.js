import React, { useState, useEffect, useContext } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaSearch, FaHistory, FaMoneyBillWave, FaTruck } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiLocationOn } from 'react-icons/ci';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { logEvent } from '../../analytics';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { CarContext } from '../CarContext';
import ReactPlayer from 'react-player'
import SearchPage from '../Search';

import './index.css';

const Home = () => {
  const { user, updateUser } = useContext(UserContext);
  const [favourites, setFavourites] = useState({});
  const [activeTab, setActiveTab] = useState('All');
  const { cars } = useContext(CarContext);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Car brands array
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

  // Initialize favorite cars on mount
  useEffect(() => {
    if (user?.favouriteCar) {
      setFavourites(user.favouriteCar);
    }
  }, [user]);

  const getFilteredCars = () => {
    if (activeTab === 'All') {
      return cars; // Return all cars if 'All' is selected
    }
    return cars.filter(car => car.brand === activeTab); // Filter cars based on selected brand
  };

  const filteredCars = getFilteredCars();

  const toggleFavourite = async (carId) => {
    const isFavourite = user.favouriteCar[carId];
    logEvent('Car', 'Favourite', carId);

    try {
      if (isFavourite) {
        // API call to remove the car from favorites
        const response = await axios.post(
          `https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/favorites/remove`,
          { uniqueId: user.c2cUserId, carId }
        );

        const updatedFavourites = { ...favourites, [carId]: false };
        setFavourites(updatedFavourites); // Update local state
        updateUser({ favouriteCar: response.data.favorites }); // Sync with user context
      } else {
        // API call to add the car to favorites
        const response = await axios.post(
          'https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/favorites/add',
          {
            uniqueId: user.c2cUserId,
            carId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const updatedFavourites = { ...favourites, [carId]: true };
        setFavourites(updatedFavourites); // Update local state
        updateUser({ favouriteCar: updatedFavourites }); // Sync with user context
      }
    } catch (error) {
      console.error('Failed to toggle favorite status', error);
    }
  };

  const style = {
    backgroundImage: `url("/assets/CarBG.jpg")`,
  };
  
  return (
    <div className="home-container">
      {/* <div className="car-search-form-container"> */}
        <img style={{ width: "100%", height: "100%",backgroundSize: "cover" }} src="/assets/000.png" alt="main-image" />
     
      {/* </div> */}
    <SearchPage/>

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
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
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
                        toggleFavourite(car.carId);
                      }}
                    >
                      {user.favouriteCar[car.carId] ? <FaHeart /> : <FaRegHeart />}
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
      <img style={{ width: "100%", height: "100%",backgroundSize: "cover" }} src="/assets/001.png" alt="main-image" />
      <img style={{ width: "100%", height: "100%",backgroundSize: "cover" }} src="/assets/002.png" alt="main-image" />
      <img style={{ width: "100%", height: "100%",backgroundSize: "cover" }} src="/assets/003.png" alt="main-image" />

      <div className="app-container">
      <div className="image-container">
        {/* Mobile Image */}
        <img
          src="https://www.mytechlogy.com/upload/by_users/TomBrown/031312051407FstoppersAndroidScreenshot2.jpg" // Replace with your mobile image URL
          alt="Mobile App Screenshot"
          className="mobile-image"
        />
      </div>
      <div className="features-container">
        <h1 className="features-heading">Key Features of the C2C App</h1>
        <div className="features-grid">
          <div className="feature-item-home">
            <div className="icon-home">
              <FaSearch size={40} color="#00aaff" />
            </div>
            <h3>Powerful Search</h3>
            <p className="feature-p-home">
              Easily filter and sort through our extensive inventory to find the perfect car for your needs.
            </p>
          </div>
          
          <div className="feature-item-home">
            <div className="icon-home">
              <FaHistory size={40} color="#00aaff" />
            </div>
            <h3>Vehicle History Reports</h3>
            <p>
              Access detailed reports on the condition and maintenance of each used car, ensuring transparency.
            </p>
          </div>
          
          <div className="feature-item-home">
            <div className="icon-home">
              <FaMoneyBillWave size={40} color="#00aaff" />
            </div>
            <h3>Financing Options</h3>
            <p>
              Explore flexible financing plans and get pre-approved, making the purchasing process seamless.
            </p>
          </div>
          
          <div className="feature-item-home">
            <div className="icon-home">
              <FaTruck size={40} color="#00aaff" />
            </div>
            <h3>Hassle-Free Delivery</h3>
            <p>
              Schedule a convenient time for your car to be delivered directly to your home or office.
            </p>
          </div>
        </div>
      </div>
    </div>
    <img style={{ width: "100%", height: "100%",backgroundSize: "cover" }} src="/assets/004.png" alt="main-image" />
  {/* <div className="fullscreen-video-container"> * */}
      {/* <div class="youtube-video-container"> */}
      <iframe 
    class="responsive-iframe"
    src="https://www.youtube.com/embed/sic69Rdxq68?autoplay=1&loop=1&playlist=sic69Rdxq68&rel=0&modestbranding=1&controls=0" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>



</div>

      // </div>

    // </div>
  );
};

export default Home;
