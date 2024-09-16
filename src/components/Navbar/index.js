import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaEye, FaEyeSlash, FaArrowLeft , FaCar, FaHeart} from "react-icons/fa";
import Modal from "react-modal";
import { statesData } from "../../statesData";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai"; // Importing icons
import { logEvent } from '../../analytics';
import axios from 'axios'; 
import "./index.css";

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [isOtpFieldVisible, setOtpFieldVisible] = useState(false); // Show OTP field
  const [otp, setOtp] = useState(''); // OTP state
  const [email, setEmail] = useState('');
  const [isOtpSent, setOtpSent] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);



  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current.focus(); // Focus on the input when search opens
    }
  }, [isSearchOpen]);

  const handleSearchClick = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

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
    logEvent('select_state', { state }, 'jk');
    setSelectedState(state);
    setModalIsOpen(false);
  };



  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);


  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleOtpChange = (event) => setOtp(event.target.value);


   // Simulate sending OTP API request
   const sendOtp = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/send-otp", { email });
      if (response.data.success) {
        setOtpSent(true);
        setOtpFieldVisible(true);
        setShowResendOtp(true);
        alert("OTP sent to your email!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Verify OTP function
const verifyOtp = async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/verify-otp", { email, otp });
    if (response.data.success) {
      setIsEmailVerified(true);
      alert("OTP verified! Proceed with next steps.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
};

//function used for forgot password
const handleForgotPassword = async (e) => {
  e.preventDefault();
  if (!email) {
    alert("Please enter your email.");
    return;
  }
  try {
    const response = await axios.post("http://localhost:3001/api/send-otp", { email });
    if (response.data.success) {
      setOtpSent(true);
      setForgotPasswordMode(true);
      alert("OTP sent to your email!");
    } else {
      alert("Failed to send OTP. Please try again.");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};


// Handle register with OTP verification
const handleRegister = async (e) => {
  e.preventDefault();
  if (password.length < 7) {
    alert("Password must contain at least 7 characters.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  if (!isOtpSent || !otp) {
    alert("Please enter the OTP sent to your email.");
    return;
  }
  try {
    const otpVerificationResponse = await axios.post("http://localhost:3001/api/verify-otp", { email, otp });
    if (otpVerificationResponse.data.success) {
      const response = await axios.post("/api/register", { email, password });
      if (response.data.success) {
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    // Send login request
    const response = await axios.post("http://localhost:3001/api/login", { email, password });

    if (response.data.success) {
      alert("Login successful!");
      // You can save the token or user details in localStorage or context if needed
      localStorage.setItem("token", response.data.token); // Example for storing token
      // Redirect or handle post-login logic here
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
};

  const trendingCars = [
    { name: "Tata Curvv", icon: <AiOutlineClockCircle /> },
    { name: "Hyundai Alcazar", icon: <AiOutlineClockCircle /> },
    { name: "Jeep Compass", icon: <AiOutlineClockCircle /> },
  ];


  return (
    <>
      <header className="header">
        <div className="container">
        <div className="brand">
      <Link to="/">
  <div className="brand-logo">
    <div>
        <img alt='c2c-logo' className="logo-c2c" src='/assets/C2Clogo.jpg' />
    </div>
    <div>
      <h1 className="brand-name-c2c">C2C</h1>
    </div>
  </div>
      </Link>
</div>
          <nav className="nav">
            <ul>
              {/* <li>
                <Link to="/" className="nav-item">CARS</Link>
              </li> */}
              
            </ul>
          </nav>
          <div className="actions">
            {/* <div className="search"> */}
            <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
      <div className="search-header">
        {isSearchOpen ? (
          <button className="back-icon" onClick={closeSearch}>
            <FaArrowLeft />
          </button>
        ) : (
          <button className="search-icon" onClick={toggleSearch}>
            <FaSearch /> Search
          </button>
        )}
        <input
          ref={searchInputRef}
          type="text"
          className={`search-input ${isSearchOpen ? "visible" : ""}`}
          placeholder="Search..."
        />
      </div>
      {isSearchOpen && (
        <div className="trending-cars">
          <h3>Trending Cars</h3>
          <ul>
            <li>
              <FaSearch /> Jeep Compass
            </li>
            <li>
              <FaSearch /> Tata Curvv
            </li>
            <li>
              <FaSearch /> Hyundai Alcazar
            </li>
          </ul>
        </div>
      )}
    </div>
            {/* </div> */}
            <div className="icons">
                <Link to ="/my-cars" className="nav-item">
            <div className="location">
              <div className="location-icon">
                  <FaHeart size={24} />
              </div>
              <div className="location-text">
                <p>My Cars</p>
                </div>
                </div>
                </Link>
              <div className="location" title="Location" onClick={openModal}>
                <div className="location-icon">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div className="location-text">
                <p>Choose Location</p>
                </div>
              </div>

              <div className="location">
              <div className="location-icon" title="Language" onClick={openLoginModal}>
                <FaUser size={24} />
              </div>
              <div className="location-text">
                <p>Profile</p>
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </header>
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
              <div className="state-name">
              <h6 className="state-name-text">{state.name}</h6>
              </div>
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
            <input
              type="email"
              placeholder="Email"
              required
              className="modal-input"
              value={email}
              onChange={handleEmailChange}
            />

            {/* OTP field */}
            {isOtpFieldVisible && (
              <input
                type="text"
                placeholder="Enter OTP"
                required
                className="modal-input"
                value={otp}
                onChange={handleOtpChange}
              />
            )}

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

{forgotPasswordMode && isOtpSent && (
  <div>
    <input
      type="text"
      placeholder="Enter OTP"
      required
      className="modal-input"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button type="button" onClick={verifyOtp} className="modal-button">
      Verify OTP
    </button>
    {isEmailVerified && (
      <div>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="New Password"
          required
          className="modal-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          required
          className="modal-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="eye-icon" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
        <button type="button" onClick={handleRegister} className="modal-button">
          Reset Password
        </button>
      </div>
    )}
  </div>
)}


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
              
              {isRegister && <button type="button" className="modal-button" onClick={sendOtp}>
                Send OTP
              </button>}
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
