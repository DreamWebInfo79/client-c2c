import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { FaRegHeart, FaTag, FaCogs, FaMapMarkerAlt, FaCar, FaTachometerAlt, FaChair, FaGasPump, FaPaintBrush, FaUser, FaHeart } from 'react-icons/fa';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { cars } from './cars';
import './index.css';

const CarDetails = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(null);
  const { id } = useParams();

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
  <div className='car-header-left'>
    <p className='car-price'>Price: {car.price}</p>
  </div>
  <div className='car-header-right'>
    <FaRegHeart className='favourite-icon' />
    <p> Add to favourite</p>
  </div>
</div>

        <div className="car-image-container">
          <img src={car.image} alt={car.model} className="car-image" />
          <div></div>
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
        <div className="car-brand-container">
          <h2>Selected Car Brand</h2>
          <p>{car.brand}</p>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
