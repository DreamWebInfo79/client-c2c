import React ,{ useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Modal from "react-modal";
import { statesData } from "../../statesData";
import { IoClose } from "react-icons/io5";
import {useGeoLocation} from 'geo-location-hook';
import { Link } from 'react-router-dom'; 
import "./index.css";

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const { location, error, isLoading } = useGeoLocation();

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
    setModalIsOpen(false)
      setSearchQuery('')
  }

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setModalIsOpen(false);
    // Optionally close the modal or take any other action
    // setModalIsOpen(false);
  };

  const handleDetectLocation = () => {
    if (location) {
      const nearestState = findNearestState(location, filteredStates);
      handleStateSelect(nearestState);
      console.log('Nearest state:', nearestState);
      setSelectedState(nearestState);
      setModalIsOpen(false);
    } else if (error) {
      console.error('Error detecting location:', error);
    }
  };

  const findNearestState = (location, states) => {
    // Implement a basic distance calculation assuming states have lat/long
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
      const stateLat = state.latitude;  // Example property name
      const stateLon = state.longitude; // Example property name
      const dist = distance(location.latitude, location.longitude, stateLat, stateLon);

      if (dist < minDistance) {
        minDistance = dist;
        nearestState = state;
      }
    });

    return nearestState;
  };




  return (
    <>
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <img alt='c2c-logo' className="logo-c2c" src='/assets/C2Clogo.jpg'/>
              <h1 className="brand-name-c2c">C2C</h1>
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
              <div className="location-text">Choose Location</div>
            </div>
              <div className="language-icon" title="Language">
                <FaUser size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {selectedState && (
        <h1>selected state: {selectedState.name}</h1>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Select State"
      >
        <button className="modal-close-button" onClick={closeModal}>
          <IoClose/>
        </button>
        <div className="modal-header">
          <input 
            type="text" 
            className="state-search" 
            placeholder="Enter state" 
            onChange={handleSearch} 
          />
        </div>
        <button className="detect-location-button" onClick={handleDetectLocation}>
            Detect My Location
          </button>
        <div className="states-list">
          {filteredStates.slice(0, showAll ? filteredStates.length : 9).map((state, index) => (
            <div className="state-item" key={index} onClick={() => handleStateSelect(state)}>
              <img src={state.image} alt={state.name} className="state-image" />
              <div className="state-name">{state.name}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
        {!showAll && filteredStates.length > 8 && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
        </div>
      </Modal>

    </>
  );
}
