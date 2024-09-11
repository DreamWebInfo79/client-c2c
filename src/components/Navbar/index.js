import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaEye, FaEyeSlash  } from "react-icons/fa";
import Modal from "react-modal";
import { statesData } from "../../statesData";
import { IoClose } from "react-icons/io5";
import { useGeoLocation } from 'geo-location-hook';
import { Link } from 'react-router-dom';
import "./index.css";

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const { location, error, isLoading } = useGeoLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStates = statesData.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setSearchQuery('');
  };

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setModalIsOpen(false);
  };

  const handleDetectLocation = () => {
    if (location) {
      const nearestState = findNearestState(location, filteredStates);
      handleStateSelect(nearestState);
      setSelectedState(nearestState);
      setModalIsOpen(false);
    } else if (error) {
      console.error('Error detecting location:', error);
    }
  };

  const findNearestState = (location, states) => {
    const distance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    let nearestState = null;
    let minDistance = Infinity;

    states.forEach(state => {
      const stateLat = state.latitude;
      const stateLon = state.longitude;
      const dist = distance(location.latitude, location.longitude, stateLat, stateLon);

      if (dist < minDistance) {
        minDistance = dist;
        nearestState = state;
      }
    });

    return nearestState;
  };



  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 7) {
      alert("Password must contain at least 7 characters.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Perform registration logic here
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
            <div>
              <img alt='c2c-logo' className="logo-c2c" src='/assets/C2Clogo.jpg' />
              </div>
              <div>
              <h1 className="brand-name-c2c">C2C</h1>
            </div>
            </div>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/" className="nav-item">CARS</Link>
              </li>
              <li>
                <Link to="/my-cars" className="nav-item">My CARS</Link>
              </li>
            </ul>
          </nav>
          <div className="actions">
            <div className="search">
              <div className="search-container" title="Search">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by car name or brand"
                    aria-label="Search by car name or brand"
                    className="search-input"
                  />
                  <div className="search-icon">
                    <FaSearch size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="icons">
              <div className="location" title="Location" onClick={openModal}>
                <div className="location-icon">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div className="location-text">
                <p>Choose Location</p>
                </div>
              </div>
              <div className="language-icon" title="Language" onClick={openLoginModal}>
                <FaUser size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Selected State */}
      {selectedState && (
        <h1>Selected state: {selectedState.name}</h1>
      )}

      {/* State Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Select State"
      >
        <button className="modal-close-button" onClick={closeModal}>
          <IoClose />
        </button>
        <div className="modal-header">
          <input
            type="text"
            className="state-search"
            placeholder="Enter state"
            onChange={handleSearch}
          />
        </div>
        <div className="states-list">
          {filteredStates.slice(0, showAll ? filteredStates.length : 9).map((state, index) => (
            <div className="state-item" key={index} onClick={() => handleStateSelect(state)}>
              <img src={state.image} alt={state.name} className="state-image" />
              <div className="state-name">{state.name}</div>
            </div>
          ))}
        </div>
        {!showAll && filteredStates.length > 8 && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </Modal>

      {/* Login/Registration Modal */}
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={() => setLoginModalIsOpen(false)}
        className="modal-login"
        overlayClassName="modal-overlay"
        contentLabel="User Login"
      >
        <button className="modal-close-button" onClick={() => setLoginModalIsOpen(false)}>
          <IoClose />
        </button>
        <div className="modal-content">
          <h2>{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={isRegister ? handleRegister : null}>
            <input type="email" placeholder="Email" required className="modal-input" />
            
            {/* Password field with eye icon */}
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                className="modal-input"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            {isRegister && (
              <div className="password-container">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="modal-input"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}

            <div className="modal-buttons-container">
              <button type="submit" className="modal-button">
                {isRegister ? "Register" : "Login"}
              </button>
            </div>
          </form>
          
          <p>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <span
              className="modal-toggle"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login here" : "Register now"}
            </span>
          </p>
        </div>
      </Modal>

      

    </>
  );
}
