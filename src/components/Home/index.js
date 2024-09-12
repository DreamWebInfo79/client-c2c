import React, {useState} from 'react';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiLocationOn } from "react-icons/ci";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import carVideo from '../../../public/video/c2cintro.mp4'
import CarSearchForm from '../CarSearchForm';
import {videoGif} from '../../statesData';


import './index.css';


const cars = [
  {
    "id": 1,
    "price": "₹3,00,000",
    "model": "Honda City",
    "year": 2018,
    "condition": "Used",
    "image": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9710/1677914238296/front-left-side-47.jpg",
    "brand": "Honda",
    "location" : "Chennai"
  },
  {
    "id": 2,
    "price": "₹4,50,000",
    "model": "Honda Civic",
    "year": 2017,
    "condition": "Used",
    "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/27074/civic-exterior-right-front-three-quarter-148156.jpeg?q=80",
    "brand": "Honda",
    "location":"Salem"
  },
  {
    "id": 3,
    "price": "₹5,20,000",
    "model": "Honda Accord",
    "year": 2016,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Honda",
    "location":"Namakkal"
  },
  {
    "id": 4,
    "price": "₹3,75,000",
    "model": "Honda Jazz",
    "year": 2019,
    "condition": "Used",
    "image": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/46891/jazz-exterior-right-front-three-quarter.jpeg?q=80",
    "brand": "Honda",
    "location":"Karur",
  },
  {
    "id": 5,
    "price": "₹6,80,000",
    "model": "Honda CR-V",
    "year": 2020,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Honda",
    "location":"Chennai",
  },
  {
    "id": 6,
    "price": "₹7,00,000",
    "model": "Honda Amaze",
    "year": 2021,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Honda",
    "location":"Chennai",

  },
  {
    "id": 7,
    "price": "₹3,20,000",
    "model": "Maruti Swift",
    "year": 2019,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Maruti",
    "location":"Chennai",

  },
  {
    "id": 8,
    "price": "₹4,75,000",
    "model": "Maruti Baleno",
    "year": 2020,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Maruti",
    "location":"Chennai",

  },
  {
    "id": 9,
    "price": "₹5,50,000",
    "model": "Maruti Vitara Brezza",
    "year": 2018,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Maruti",
    "location":"Chennai",

  },
  {
    "id": 10,
    "price": "₹3,90,000",
    "model": "Maruti Dzire",
    "year": 2019,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Maruti",
    "location":"Chennai",

  },
  {
    "id": 11,
    "price": "₹4,30,000",
    "model": "Hyundai Verna",
    "year": 2017,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  },
  {
    "id": 12,
    "price": "₹5,60,000",
    "model": "Hyundai Creta",
    "year": 2018,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  },
  {
    "id": 13,
    "price": "₹4,20,000",
    "model": "Hyundai i20",
    "year": 2019,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  },
  {
    "id": 14,
    "price": "₹3,80,000",
    "model": "Hyundai Grand i10",
    "year": 2018,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  },
  {
    "id": 15,
    "price": "₹6,00,000",
    "model": "Hyundai Tucson",
    "year": 2017,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  },
  {
    "id": 16,
    "price": "₹7,50,000",
    "model": "Hyundai Elantra",
    "year": 2020,
    "condition": "Used",
    "image": "https://www.motortrend.com/uploads/sites/5/2021/05/2021-honda-accord-sport-2-0t-15.jpg",
    "brand": "Hyundai",
    "location":"Chennai",

  }
]

const Home = () => {
  const [favourites, setFavourites] = useState({});
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const brands = ['All', 'Honda', 'Maruti', 'Hyundai', 'Tata', 'Toyota', 'BMW', 'Mercedes', 'Audi', 'Ford'];


  const carBrands = [
    {name:'All', logo: 'car-brand/all.png'},
    { name: 'Toyota', logo: 'car-brand/toyota.png' },
    { name: 'Honda', logo: '/car-brand/honda-rm-removebg-preview.png' },
    { name: 'Ford', logo: '/car-brand/ford.png' },
    { name: 'BMW', logo: '/car-brand/bmw-removebg-preview.png' },
    { name: 'Mercedes-Benz', logo: '/car-brand/benz-removebg-preview.png' },
    { name: 'Audi', logo: '/car-brand/audi-removebg-preview.png' },
    { name: 'TATA', logo: '/car-brand/Tata-Symbol.png' },
    { name: 'Mahindra', logo: '/car-brand/f2bf43_6dde9adb83b745e7b9a0c14c4665d70d~mv2.jpg' },
  ];

  const visibleBrands = showAll ? carBrands : carBrands.slice(0, 6);


  const navigate = useNavigate();

  const toggleFavourite = (carId) => {
    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [carId]: !prevFavourites[carId],
    }));
  };

  const filteredCars = activeTab === 'All' ? cars : cars.filter(car => car.brand === activeTab);


const style = {
  backgroundImage: `url(/video/car.gif)`,
  backgroundSize:'cover',
  height:'550px',
};


  return (
    <div className="home-container">
      {/* <div className="gif-container">
        <img
          src="/video/car.gif"
          alt="Description of the GIF"
          width="100%"
          height="auto"
        />
      </div> */}
        <div className="car-search-form-container"  style={style}>
          <CarSearchForm />
        </div>
        <div className="car-container-main">
        <h1 className="car-container-heading">Popular Cars</h1>
        <div>
        <div className="tabs-container desktop">
        {visibleBrands.map((brand) => (
          <div
            key={brand}
            className={`tab ${activeTab === brand ? 'active' : ''}`}
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
      <div>
        <img className="brand-logo" src={brand.logo} alt={`${brand.name} logo`} />
        </div>
        <div>
        <span className="brand-name">{brand.name}</span>
      </div>
      </div>
    ))}
  </div>
  
  <div className="toggle-button" onClick={() => setShowAll(!showAll)}>
    {showAll ? 'View Less Brands' : 'View More Brands'}
  </div>
</div>


    </div>
        <div className="cars-brand-container-home">
          {/* <h2>{brand} Cars</h2> */}
            {filteredCars.map(car => (
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
                      onClick={() => toggleFavourite(car.id)}
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
            ))}
        </div>
      {/* ))} */}
    </div>
    </div>
  );
};

export default Home;