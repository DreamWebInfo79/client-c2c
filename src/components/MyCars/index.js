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
  // const uniqueId = Cookies.get('c2cUserId');
  const uniqueId = "67c5dac4-febd-4b0d-a458-45f01ee01c69";

  // Fetch favorite cars
  const fetchFavoriteCars = () => {
    if (uniqueId) {
      axios
        .get(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/car/favorites/${uniqueId}`)
        .then((response) => {
          setCars(response.data.favorites || []); // Assuming API returns { favorites: [] }
          // Update favorites state
          const favState = response.data.favorites.reduce((acc, car) => {
            acc[car.carId] = true;
            return acc;
          }, {});
          setFavourites(favState);
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
  }, []);

  const toggleFavourite = (carId, isFavourite) => {
    if (isFavourite) {
      console.log(carId,uniqueId);
      axios
        .post(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/favorites/remove`, { uniqueId, carId })
        .then((response) => {
          console.log('Car unfavorited:', response.data);
          fetchFavoriteCars(); // Refetch after removing favorite
        })
        .catch((error) => {
          console.error('Error unfavoriting car:', error);
        });
    } else {
      axios
        .post(`https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/favorites/add`, { uniqueId, carId })
        .then((response) => {
          console.log('Car favorited:', response.data);
          fetchFavoriteCars(); // Refetch after adding favorite
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
