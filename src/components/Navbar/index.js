import React ,{ useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Modal from "react-modal";
import { statesData } from "../../statesData";
import "./index.css";

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
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
                <div className="nav-item">CARS</div>
              </li>
              <li>
                <div className="nav-item">My CARS</div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Select State"
      >
        <button onClick={closeModal} className="modal-close-button">×</button>
        <h2>Select a State</h2>
        <div className="states-list">
          {statesData.map((state, index) => (
            <div key={index} className="state-item">
              <img src={state.image} alt={state.name} className="state-image" />
              <p className="state-name">{state.name}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
