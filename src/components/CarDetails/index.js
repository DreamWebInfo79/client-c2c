import React, { useState, useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { FaRegHeart, FaTag, FaCogs, FaMapMarkerAlt, FaCar, FaTachometerAlt, FaChair, FaGasPump, FaPaintBrush, FaUser, FaHeart } from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { CiLocationOn } from "react-icons/ci";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { FaSun, FaSnowflake, FaKey, FaCameraRetro, FaBluetooth, FaWindowMaximize } from 'react-icons/fa';
import './index.css';
import axios from 'axios';
import {  FaDoorOpen, FaShapes, FaParking, FaLock } from "react-icons/fa";

import { logEvent } from '../../analytics';

const CarDetails = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);
  const [cars,setCars] = useState([]);
  const { id, brand } = useParams();
  const navigate = useNavigate();
  const currentURL = window.location.href;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/cars/${id}`);
        setCar(response.data.car);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

    // Fetch car data from API
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get('http://localhost:3001/all-cars'); // Adjust the API URL as per your backend
          const fetchedCars = response.data.cars || [];
          const allCars = Object.values(fetchedCars).flat();
          setCars(allCars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase()));
          // setCars(fetchedCars.Tata); 
          console.log(fetchedCars);
        } catch (error) {
          console.error('Failed to fetch car data', error);
        }
      };
      fetchCars();
    }, []);



  const handleShareClick = (platform) => {
    logEvent('Share Car', { platform }, 'jk');
    let shareURL = "";
    const encodedURL = encodeURIComponent(currentURL);

    switch (platform) {
        case "whatsapp":
            shareURL = `https://wa.me/?text=${encodedURL}`;
            break;
        case "facebook":
            shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
            break;
        case "twitter":
            shareURL = `https://twitter.com/intent/tweet?url=${encodedURL}`;
            break;
        default:
            break;
    }

    if (shareURL) {
        window.open(shareURL, "_blank");
    }
};

  // const selectedCar = car.brand || "Honda";
  const iconMapping = {
    FaSnowflake: FaSnowflake,
    FaWindowMaximize: FaWindowMaximize,
    FaCogs: FaCogs,
    FaCar: FaCar,
    MdEventSeat: MdEventSeat,
    FaMapMarkerAlt: FaMapMarkerAlt,
    FaBluetooth: FaBluetooth,
    FaKey: FaKey,
    FaSun: FaSun,
    FaCameraRetro: FaCameraRetro
  };

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <img src="/video/car-loader.gif" alt="car-loader" className="car-loader"/>
        <h1>Loading.....Please wait!!</h1>
      </div>
    );
  }

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

  const handleBookNowClick = () => {
    logEvent('book_now', { car_id: car.id }, 'jk');
    // Handle book now click
  };

  const handleFreeTestDriveClick = () => {
    logEvent('free_test_drive', { car_id: car.id }, 'jk');
    // Handle free test drive click
  };

  return (
    <>
      <div className="car-details-container">
      <div className='car-header-container'>
  <div className='car-header-left'>
    <h1>{car.brand} {car.model}</h1>
    <p className='car-infos'>{car.year} | {car.fuelType} | {car.transmission}</p>
  </div>
  <div className='car-header-centre'>
    <p className='car-price'>Rs: {car.price}</p>
    <p className='car-infos'>{car.kmDriven}</p>
  </div>
  <div className='car-header-right'>
    <FaRegHeart className='favourite-icon' />
    <p> Add to favourite</p>
  </div>
</div>

<div className="car-image-container" style={{height:"auto"}}>
  <div style={{width:"70%", height:"auto"}}>

  <Carousel autoPlay infiniteLoop>
      {car.images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Car separate ${index + 1}`} />
          <p className="legend">{`Image ${index + 1}`}</p>
        </div>
      ))}
    </Carousel>
  </div>
  <div className="car-info">
    <h1 className="car-title">{car.model}</h1>
    
    <p className="car-description">Car is at a good price and condition</p>
    <p className="car-detail"><strong>Year:</strong> {car.year}</p>
    <p className="car-detail"><strong>Mileage:</strong> {car.kmDriven} km</p>
    <p className="car-detail"><strong>Condition:</strong> {car.condition}</p>
    <p className="car-detail"><strong>Location:</strong> {car.location}</p>
    <p className="car-detail"><strong>Home Test Drive:</strong> Available</p>

    <div className="btn-container">
        <button className="book-now" onClick={() => handleBookNowClick()}>Book Now <br/>Contact us</button>
        <button className="free-test-drive" onClick={() => handleFreeTestDriveClick()} >Free Test Drive</button>
    </div>
    
    <div className="share-container">
        <h2>Share with a friend:</h2>
        <div className="social-icons">
                <FaWhatsapp className="social-icon" onClick={() => handleShareClick("whatsapp")} />
                <FaFacebook className="social-icon" onClick={() => handleShareClick("facebook")} />
                <FaTwitter className="social-icon" onClick={() => handleShareClick("twitter")} />
                {/* <FaInstagram className="social-icon" onClick={() => handleShareClick("instagram")} /> */}
            </div>
    </div>
</div>
  </div>

        <div className="car-details">
          <h1>{`${car.year} ${car.model}`}</h1>
          <p><CiLocationOn /> {car.location}</p>
          <p>Car is as Good Condition,Car is as Good Condition Car is as Good Condition, Car is as Good Condition</p>
         
          <ul className='car-details-main'>
  <li>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px' }}>
      <FaRoad size={25} />
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Kilometers</h2>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>{car.kmDriven}</h2>
      </div>
    </div>
  </li>
  <li>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px' }}>
      <BsFillFuelPumpFill size={25} />
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Fuel Type</h2>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>{car.fuelType}</h2>
      </div>
    </div>
  </li>
  <li>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px' }}>
      <GiGearStickPattern size={25} />
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Transmission</h2>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>{car.transmission}</h2>
      </div>
    </div>
  </li>
  <li>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px' }}>
      <FaUserTie size={25} />
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Owner</h2>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>1st Owner</h2>
      </div>
    </div>
  </li>
</ul>
<hr className='line'/>
<div>
  <h1 className="feature-heading-text">Features</h1>
  <ul style={{ display: "flex", justifyContent: "center", listStyleType: "none", padding: 0, gap: '10px', margin: 0, flexWrap: 'wrap' }}>
  {car.features.map((feature, index) => {
    const IconComponent = iconMapping[feature.icon]; // Lookup the icon component
    return (
      <li key={index} className='feature'>
        {IconComponent && <IconComponent size={26} />}
        <p>{feature.label}</p>
      </li>
    );
  })}
</ul>
</div>
<hr className='line'/>
<div className="specifications-card">
      <h2 className="feature-heading-text">Technical Specifications</h2>
      <div className="specifications-grid">
        {car.technicalSpecifications.map((spec) => (
          <div key={spec._id} className="specification-item">
            {/* <div className="spec-icon">{spec.icon}</div> */}
              <div className="spec-label">{spec.label}</div>
            <div className="spec-content">
              <div className="spec-value">{spec.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>   
        </div>
        <h1 className="related-cars-heading">Related Cars</h1>
        <div className="cars-brand-container">
        {cars.map(car => (
              <div className="NewUcExCard posR"  onClick={() => navigate(`/car/${car.brand}/${car.carId}`)} key={car.carId}>
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
                        <div  title={car.model} className="car-link">
                          <p>{`${car.year} ${car.model}`}</p>
                        </div>
                      </h3>
                      <div className="dotsDetails">
                        {`${car.year} • ${car.condition}`}
                      </div>
                    </div>
                    <div
                      id="shortlistHeartIcon"
                      className="shortlist NewUcrShortList"
                      onClick={() => "toggleFavourite"(car.carId)}
                    >
                      {/* {"favourites"[car.carId] ? <FaHeart /> : <FaRegHeart />} */}
                      <FaRegHeart />
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
            ))}
        </div>
      </div>
    </>
  );
};

export default CarDetails;
