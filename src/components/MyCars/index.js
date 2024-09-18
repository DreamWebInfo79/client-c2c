import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import './index.css';

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState({});
  const navigate = useNavigate();

  // Get userId from cookies
  const userId = Cookies.get('c2cUserId'); // Assuming 'c2cUserId' is stored in cookies

  // Fetch favorite cars
  const fetchFavoriteCars = () => {
    if (userId) {
      axios
        .get(`http://localhost:3001/car/favoriteCars/${userId}`)
        .then((response) => {
          setCars(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching favorite cars:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteCars(); // Fetch favorite cars on component mount
  }, [userId]);

  // Toggle favourite and unfavourite
  const toggleFavourite = (carId, isFavourite) => {
    if (isFavourite) {
      // Unfavorite car API call
      axios
        .post(`http://localhost:3001/car/unfavorite`, { userId, carId })
        .then((response) => {
          console.log('Car unfavorited:', response.data);
          fetchFavoriteCars(); // Refetch favorite cars after unfavoriting
        })
        .catch((error) => {
          console.error('Error unfavoriting car:', error);
        });
    } else {
      // Add to favorite API call (if needed)
      axios
        .post(`http://localhost:3001/car/favorite`, { userId, carId })
        .then((response) => {
          console.log('Car favorited:', response.data);
          fetchFavoriteCars(); // Refetch favorite cars after favoriting
        })
        .catch((error) => {
          console.error('Error favoriting car:', error);
        });
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <img src="/video/car-loader.gif" alt="car-loader" className="car-loader" />
        <h1>Loading.....Please wait!!</h1>
      </div>
    );
  }

  return (
    <div className="my-cars-page">
      <h1 className="page-title">My Favorite Cars</h1>
      <div className="cars-brand-container-my-cars">
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
                    <div className="dotsDetails">{`${car.year} • ${car.condition}`}</div>
                  </div>
                  <div
                    id="shortlistHeartIcon"
                    className="shortlist NewUcrShortList"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from propagating to the card
                      toggleFavourite(car.carId, favourites[car.carId]);
                    }}
                  >
                    {favourites[car.carId] ? <FaHeart /> : <FaRegHeart />}
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
          <div className="text-center empty-favorites">
            <img
              src="/assets/empty-cart.png"
              alt="Empty Cart"
              className="empty-cart-image"
            />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any cars to your favorites yet.</p>
            <button className="btn btn-primary" onClick={goToHomePage}>
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;
