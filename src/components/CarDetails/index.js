import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { FaRegHeart, FaTag, FaCogs, FaMapMarkerAlt, FaCar, FaTachometerAlt, FaChair, FaGasPump, FaPaintBrush, FaUser, FaHeart } from 'react-icons/fa';
import { cars } from './cars';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CiLocationOn } from "react-icons/ci";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import './index.css';

const CarDetails = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
        <TailSpin
          height="80"
          width="80"
          color="#00BFFF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (!car) {
    return <div className="not-found">Car not found</div>;
  }

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

<div className="car-image-container">
  <div style={{width:"70%", height:"auto"}}>

  <Carousel>
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
    <h1>{car.brand} {car.model}</h1>
    
    <p className="car-description">Car is at a good price and condition</p>
    <p className="car-details">
      <strong>Year:</strong> {car.year} <br />
      <strong>Mileage:</strong> {car.kmDriven} km <br />
      <strong>Condition:</strong> {car.condition}
    </p>
    <p><strong>Home Test Drive :</strong> Available</p>
    <p><strong>Location:</strong> Spinny Car Hub, DSL Virtue Mall, Hyderabad</p>
    <div>
      <div>
        <h1>$ 3.12e Lakh</h1>
        <p>Fixed on road price</p>
      </div>
      <div className="btn-container">
        <div>
        <button className="book-now">Book Now <br/> 100% Cashback </button>
      </div>
      <div>
        <button className="free-test-drive">Free Test Drive</button>
      </div>
      </div>
      
      <div>

      </div>
    </div>
    </div>
  </div>

        <div className="car-details">
          <h1>{`${car.year} ${car.model}`}</h1>
          <div className="car-attributes">
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
              {/* <FaGears /> */}
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
          </div>
        </div>
        <h1 className="related-cars-heading">Related Cars</h1>
        <div className="cars-brand-container">
        {cars.map(car => (
              <div style={{width:'290px'}} className="NewUcExCard posR"  onClick={() => navigate(`/car/${car.id}`)} key={car.id}>
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
