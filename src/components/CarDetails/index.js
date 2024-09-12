import React, { useState, useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { FaRegHeart, FaTag, FaCogs, FaMapMarkerAlt, FaCar, FaTachometerAlt, FaChair, FaGasPump, FaPaintBrush, FaUser, FaHeart } from 'react-icons/fa';
import { cars } from './cars';
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
import {  FaDoorOpen, FaShapes, FaParking, FaLock } from "react-icons/fa";
import BottomNav from '../BottomNav';

const CarDetails = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // const selectedCar = car.brand || "Honda";

  const carFeatures = [
    { icon: <FaSnowflake size={30} />, label: "Air Conditioning" },
    { icon: <FaWindowMaximize size={30} />, label: "Power Windows" },
    { icon: <FaCogs size={30} />, label: "Power Steering" },
    { icon: <FaCar size={30} />, label: "Cruise Control" },
    { icon: <MdEventSeat size={30} />, label: "Leather Seats" },
    { icon: <FaMapMarkerAlt size={30} />, label: "Navigation System" },
    { icon: <FaBluetooth size={30} />, label: "Bluetooth Connectivity" },
    { icon: <FaKey size={30} />, label: "Keyless Entry" },
    { icon: <FaSun size={30} />, label: "Sunroof" },
    { icon: <MdEventSeat size={30} />, label: "Heated Seats" },
    { icon: <FaCameraRetro size={30} />, label: "Backup Camera" }
  ];

  const carFeaturesss = [
  { icon: <FaCar size={30} />, label: "Touchscreen Display" },
  { icon: <FaDoorOpen size={30} />, label: "Number of Doors" },
  { icon: <FaChair size={30} />, label: "Number of Seats" },
  { icon: <FaShapes size={30} />, label: "Body Type"},
  { icon: <FaParking size={30} />, label: "Parking Sensors" },
  { icon: <FaLock size={30} />, label: "Child Safety Locks" }
];

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const carData = cars.find(car => car.id === parseInt(id, 10));
      setCar(carData);
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <img src="/video/car-loader.gif" className="car-loader"/>
      </div>
    );
  }

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

  const styles = {
    list: {
      display: "flex",
      listStyleType: "none",
      padding: 0,
      gap: '15px',
      margin: 0,
      flexWrap: 'wrap',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    square: {
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
      backgroundColor: '#000', // Default background color
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    text: {
      fontSize: '14px',
    },
  };
  
  // Define the car features
  const carFeaturess = [
    { label: "Make", value: "Toyota" },
    { label: "Model", value: "Camry" },
    { label: "Year", value: "2022" },
    { label: "Price", value: "$30,000" },
    { label: "Mileage", value: "30,000 km" },
    { label: "Engine Size", value: "2.0L" },
    { label: "Fuel Type", value: "Petrol" },
    { label: "Transmission", value: "Automatic" },
    { label: "Color", value: "Black" },
    { label: "Number of Doors", value: "4-door" },
    { label: "Number of Seats", value: "5" },
    { label: "Body Type", value: "Sedan" }
  ];

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
                <div>
                    <img  src={car.image} alt="car" />
                    <p className="legend">Image 1</p>
                </div>
                <div>
                    <img src={car.image} alt="car"/>
                    <p className="legend">Image 2</p>
                </div>
                <div>
                    <img src={car.image} alt="car"/>
                    <p className="legend">Image 3</p>
                </div>
                <div>
                    <img src={car.image} alt="car"/>
                    <p className="legend">Image 4</p>
                </div>
                <div>
                    <img src={car.image} alt="car"/>
                    <p className="legend">Image 5</p>
                </div>
                <div>
                    <img src={car.image} alt="car"/>
                    <p className="legend">Image 6</p>
                </div>
            </Carousel>
  </div>
  <div className="car-info">
    <h1 className="car-title">{car.brand} {car.model}</h1>
    
    <p className="car-description">Car is at a good price and condition</p>
    <p className="car-detail"><strong>Year:</strong> {car.year}</p>
    <p className="car-detail"><strong>Mileage:</strong> {car.kmDriven} km</p>
    <p className="car-detail"><strong>Condition:</strong> {car.condition}</p>
    <p className="car-detail"><strong>Location:</strong> Hyderabad</p>
    <p className="car-detail"><strong>Home Test Drive:</strong> Available</p>

    <div className="btn-container">
        <button className="book-now">Book Now <br/>Contact us</button>
        <button className="free-test-drive">Free Test Drive</button>
    </div>
    
    <div className="share-container">
        <h2>Share with a friend:</h2>
        <div className="social-icons">
            <FaWhatsapp className="social-icon" />
            <FaFacebook className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaInstagram className="social-icon" />
        </div>
    </div>
</div>
  </div>

        <div className="car-details">
          <h1>{`${car.year} ${car.model}`}</h1>
          <p><CiLocationOn /> {car.location}</p>
          <p>Car is as Good Condition,Car is as Good Condition Car is as Good Condition, Car is as Good Condition</p>
{/* <hr className='line'/> */}
         
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
  {/* <li>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px' }}>
      <FaRoad size={25} />
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Kilometers</h2>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal' }}>{car.kmDriven}</h2>
      </div>
    </div>
  </li> */}
</ul>
<hr className='line'/>
<div>
  <h1>Features</h1>
  <ul style={{ display: "flex",justifyContent: "center", listStyleType: "none", padding: 0, gap: '10px', margin: 0, flexWrap: 'wrap' }}>
    {carFeatures.map((feature, index) => (
      <li key={index} className='feature'>
        {feature.icon}
        <p>{feature.label}</p>
      </li>
    ))}
  </ul>
</div>
<hr className='line'/>
<div>
  <h1>Technical Specifications</h1>
  <ul style={{ display: "flex",justifyContent: "center",  listStyleType: "none", padding: 0, gap: '10px', margin: 0, flexWrap: 'wrap' }}>
    {carFeaturesss.map((feature, index) => (
      <li key={index}  className='feature'>
        {feature.icon}
        <p>{feature.label}</p>
      </li>
    ))}
  </ul>
</div>
          {/* <div className="car-attributes">
            <div className="attribute">
              <FaTag />
              <p><strong>Price:</strong> {car.price}</p>
            </div>
            <div className="attribute">
              <FaCogs />
              <p><strong>Condition:</strong> {car.condition}</p>
            </div>
            <div className="attribute">
              <FaMapMarkerAlt />
              <p><strong>Location:</strong> {car.location}</p>
            </div>
            <div className="attribute">
              <FaCar />
              <p><strong>Brand:</strong> {car.brand}</p>
            </div>
            <div className="attribute">
              <FaTachometerAlt />
              <p><strong>Kilometers Driven:</strong> {car.kmDriven}</p>
            </div>
            <div className="attribute">
              <FaChair />
              <p><strong>Seats:</strong> {car.seats}</p>
            </div>
            <div className="attribute">
              <FaGasPump />
              <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            </div>
            <div className="attribute">
              <FaGears />
              <p><strong>Transmission:</strong> {car.transmission}</p>
            </div>
            <div className="attribute">
              <FaPaintBrush />
              <p><strong>Color:</strong> {car.color}</p>
            </div>
            <div className="attribute">
              <FaUser />
              <p><strong>Owners:</strong> {car.owners}</p>
            </div>
            <div className="attribute">
              <FaCar />
              <p><strong>Engine:</strong> {car.engine}</p>
            </div>
            <div className="attribute">
              <FaCogs />
              <p><strong>Service History:</strong> {car.serviceHistory}</p>
            </div>
            <div className="attribute">
              <FaTag />
              <p><strong>Insurance:</strong> {car.insurance}</p>
            </div>
          </div> */}
        </div>
        <h1 className="related-cars-heading">Related Cars</h1>
        <div className="cars-brand-container">
        {cars.map(car => (
              <div className="NewUcExCard posR"  onClick={() => navigate(`/car/${car.id}`)} key={car.id}>
                <div className="image_container posR">
                  <div className="imagebox hover">
                    <img
                      height={154}
                      width={284}
                      alt={car.model}
                      src={car.image}
                      title={car.model}
                      className="car-image"
                    />
                  </div>
                </div>
                <div className="bottom_container">
                  <div className="title_heart_section">
                    <div className="titlebox hover">
                      <h3 className="title">
                        <a  href="#" title={car.model} className="car-link">
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
                      // onClick={() => toggleFavourite(car.id)}
                    >
                      {/* {favourites[car.id] ? <FaHeart /> : <FaRegHeart />} */}
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
