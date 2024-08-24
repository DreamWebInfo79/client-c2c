import React from "react";
import { FaCar, FaSearch, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import "./index.css";

export default function Navbar() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <a href="https://www.carwale.com/" title="CarWale">
                <FaCar size={50} color="blue" />
              </a>
            </div>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <div className="nav-item">NEW CARS</div>
              </li>
              <li>
                <div className="nav-item">USED CARS</div>
              </li>
              <li>
                <div className="nav-item">REVIEWS & NEWS</div>
              </li>
            </ul>
          </nav>
          <div className="search">
            <div className="search-container" title="Search">
              <div className="search-box">
                <div className="search-input-container" tabIndex="-1">
                  <div className="search-input-wrapper">
                    <div>
                      <input
                        type="text"
                        placeholder="Search"
                        aria-label="Input field"
                        className="search-input"
                      />
                      <div className="search-icon">
                        <FaSearch size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="location" title="Location">
              <span className="location-badge" />
              <div>
                <FaMapMarkerAlt size={24} />
              </div>
            </div>
            <div className="language-icon" title="Language">
              <FaGlobe size={24} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
