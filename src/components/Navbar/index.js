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
              <div className="location" title="Location">
                <span className="location-badge" />
                <FaMapMarkerAlt size={24} />
              </div>
              <div className="language-icon" title="Language">
                <FaGlobe size={24} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
