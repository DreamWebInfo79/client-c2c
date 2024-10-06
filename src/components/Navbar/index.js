import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaEye, FaEyeSlash, FaArrowLeft , FaCar, FaHeart} from "react-icons/fa";
import Modal from "react-modal";
import { statesData } from "../../statesData";
import { AiOutlineSearch, AiOutlineClockCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { logEvent } from '../../analytics';
import axios from 'axios'; 
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { CarContext } from '../CarContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "./index.css";

export default function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);
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
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [isOtpResendAvailable, setIsOtpResendAvailable] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const { user, updateUser } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cars , setCars, handleStateSelect } = useContext(CarContext);
  const [budget, setBudget] = useState([1, 50]);
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [activeButton, setActiveButton] = useState('new');
  const [activeLink, setActiveLink] = useState('new');

  const states = [
    "Any", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const trendingCars = [
    { name: "Tata Curvv", icon: <AiOutlineClockCircle /> },
    { name: "Hyundai Alcazar", icon: <AiOutlineClockCircle /> },
    { name: "Jeep Compass", icon: <AiOutlineClockCircle /> },
  ];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleLocationSearch =(e)=>{
    setSearchQuery(e.target.value);
  }
  
  const handleCarClick = (brand,carId) => {
    navigate(`/car/${brand}/${carId}`);
    setSearch('');
    setIsSearchOpen(false);
  };

  const filteredCars = cars.filter((car) => 
    car.model.toLowerCase().includes(search.toLowerCase()) || 
    car.brand.toLowerCase().includes(search.toLowerCase())
  );

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchClick = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleShowMore = () => {
    setShowAll(true);
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

  const handleStateSelectModal = (state) => {
    logEvent('select_state', { state }, 'jk');
    setSelectedState(state);
    handleStateSelect(state.name);
    setModalIsOpen(false);
  };



  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleOtpChange = (event) => setOtp(event.target.value);


  const handleLoginSuccess = async (response) => {
    setIsLoading(true);
    try {
      const { credential } = response;
      const googleResponse = await axios.post(
        'http://localhost:3001/auth/google/callback',        
        // 'https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/auth/google/callback',
        { token: credential },
        { withCredentials: true }
      );

      const userData = googleResponse.data;
      updateUser({ 
        c2cUserEmail: userData.email, 
        c2cUserId: userData.uniqueId, 
        favouriteCar:userData.favorites, 
      });
      setUserId(userData.uniqueId);
      setUserName(userData.email);
      console.log(userData);
      setIsLoading(false);


      setLoginModalIsOpen(false);
    } catch (error) {
      console.error('Login failed', error);
      setIsLoading(false);
    }
  };

  const handleRegisterSuccess = async (response) => {
    setIsLoading(true);
    try {
      const { credential } = response;
      const googleResponse = await axios.post(
        'https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/auth/google/callback',
        { token: credential },
        { withCredentials: true }
      );

      const userData = googleResponse.data;
      updateUser({ 
        c2cUserEmail: userData.email, 
        c2cUserId: userData.uniqueId, 
        favouriteCar:userData.favorites, 
      });
      setUserId(userData.uniqueId);
      setUserName(userData.email);
      console.log(userData);
      setIsLoading(false);


      setRegisterModalIsOpen(false);
    } catch (error) {
      console.error('Login failed', error);
      setIsLoading(false);
    }
  };


  const handleLoginFailure = (response) => {
    console.error('Login failed', response);
  };

  const handleRegisterFailure = (response) => {
    console.error('Login failed', response);
  };

//function used for forgot password
const handleForgotPassword = async (e) => {
  e.preventDefault();
  if (!email) {
    alert("Please enter your email.");
    return;
  }
  try {
    const response = await axios.post("https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/api/send-otp", { email });
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

const handleOtpVerification = async () => {
  try {
    const response = await axios.post('/api/verify-otp', { email, otp }); // Replace with actual API
    if (response.data.success) {
      setIsOtpVerified(true);
      setOtpErrorMessage('');
    } else {
      setOtpErrorMessage('Invalid OTP, please try again.');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
  }
};


// Handle register with OTP verification
const handleRegister = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/user/register', {
      email,
      password,
      otp
    });

    updateUser({ 
      c2cUserEmail: email, 
      c2cUserId: response.data.uniqueId, 
      favouriteCar:response.data.favorites, 
    });

    setEmail('');
    setPassword('');
    setOtp('');
    console.log('Registration successful:', response.data);
    setRegisterModalIsOpen(false); // Close the modal upon successful registration
  } catch (error) {
    console.error('Registration error:', error.response?.data?.error || error.message);
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
    const response = await axios.post("https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/user/login", { email, password });

    if (response.data.message) {
      updateUser({ 
        c2cUserEmail: email, 
        c2cUserId: response.data.uniqueId, 
        favouriteCar:response.data.favorites, 
      });
      setUserId(response.data.uniqueId);
      setUserName(email);
      alert("Login successful!");
      setEmail('');
      setPassword('');
      setLoginModalIsOpen(false);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
};

const handlePasswordReset = async () => {
  try {
    const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/api/reset-password', {
      email,
      otp,
      password,
      confirmPassword,
    }); // Replace with actual API
    if (response.data.success) {
      alert('Password successfully reset.');
      setLoginModalIsOpen(false); // Close modal after successful reset
    }
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};

const handleRegisterModalOpen=()=>{
  setLoginModalIsOpen(false);
  setRegisterModalIsOpen(true);
}

// API call to send OTP to the email
const handleVerifyEmail = async () => {
  try {

    const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/user/request-otp', { email });
    console.log(response)
    if(response.data.message) {
      setOtpSent(true);
    }
    else{
      alert("Failed to send OTP. Please try again.");
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const resendOtp = async () => {
  try {
    const response = await axios.post('https://7fk3e7jqgbgy7oaji5dudhb6jy0grwiu.lambda-url.ap-south-1.on.aws/user/request-otp', { email });
    console.log(response)
    if(response.data.message) {
      setOtpSent(true);
    }
    else{
      alert("Failed to send OTP. Please try again.");
    }
  } catch (error) {
    console.error('Error resending OTP:', error);
  }
};

const handleLogout =()=>{
  Cookies.remove('c2cUserId');
  Cookies.remove('c2cEmail');
  setUserId(null);
  setUserName(null);
}

useEffect(() => {
  const id = Cookies.get('c2cUserId');
  const email = Cookies.get('c2cUserEmail');
  if (id) {
    setUserId(id);
    setUserName(email); // Replace with actual API call if needed
  }
}, []);

const handleSubmit = (event) => {
  logEvent('search_car', { brand: selectBrandValue, city: cityValue, budget: budget[0] }, 'jk');
  event.preventDefault();
  const filteredCars = cars.filter((car) => {
    const isWithinBudget = car.price >= budget[0] && car.price <= budget[1];
    const matchesBrand = selectBrandValue ? car.brand === selectBrandValue : true;
    const matchesCity = cityValue ? car.city === cityValue : true;

    return isWithinBudget && matchesBrand && matchesCity;
  });

  setCars(filteredCars);
  setIsSearchOpen(true);
};

const renderBrandOptions = () => (
  <>
    <option value="">Select Brand</option>
    <option value="Maruti">Maruti</option>
    <option value="Hyundai">Hyundai</option>
    <option value="Honda">Honda</option>
    <option value="Toyota">Toyota</option>
    <option value="Ford">Ford</option>
  </>
);

function valuetext(value) {
  return `${value}L`;
}

const marks = [
  { value: 1, label: '1L' },
  { value: 10, label: '10L' },
  { value: 20, label: '20L' },
  { value: 30, label: '30L' },
  { value: 40, label: '40L' },
  { value: 50, label: '50L+' }
];

const renderCityOptions = () => (
  <>
    <option value="">Select State</option>
    {states.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </>
);

const handleBudgetChange = (event, newValue) => {
  setBudget(newValue);
};

const handleBrandOptionChange = (event) => {
  setSelectBrandValue(event.target.value);
};

const handleCityChange = (event) => {
  setCityValue(event.target.value);
};


  return (
    <>
      <header className="header">
        <div className="container-navbar">
        <div className="brand">
      <Link to="/">
  {/* <div className="brand-logo"> */}
    <div>
        <img alt='c2c-logo' className="logo-c2c" src='/assets/C2Clogo.jpg' />
      <h1 className="brand-name-c2c">C2C</h1>
    </div>
    <div>
    </div>
  {/* </div> */}
      </Link>

          <nav className="nav">
            <ul>
              {/* <li>
                <Link to="/" className="nav-item">CARS</Link>
              </li> */}
              
            </ul>
          </nav>
          </div>
          <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
      <div className="search-header">
        {isSearchOpen ? (
          <button className="back-icon" onClick={closeSearch}>
            <FaArrowLeft />
          </button>
        ) : (
          <div className="location-search" onClick={toggleSearch}>
          <FaSearch className="search-icon" />
              <input placeholder="search cars..." className="location-search-input" type="search" />
          </div>
        )}
        <div>
          <input 
        className={`search-input ${isSearchOpen ? "visible" : ""}`}
        type="text" 
        placeholder="Search cars..." 
        value={search} 
        onChange={handleSearch} 
      />
      {search && (

        <ul className="dropdown">
          {filteredCars.map((car) => (
            <li key={car.id} className="car-item" onClick={() => handleCarClick(car.brand, car.carId)}>
              <FaCar className="car-item-icon" />
              <span className="car-item-text">{car.brand} - {car.model}</span>
            </li>
          ))}
        </ul>
      )}
      </div>
      </div>
      {isSearchOpen && (
        <div className="car-search-form" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <form>
        <div>
        <div className="link-container">
  <a
    href="#"
    className={`button-custom-link ${activeLink === 'new' ? 'activee' : ''}`}
    onClick={() => setActiveLink('new')}
  >
    New Cars
  </a>
  <a
    href="#"
    className={`button-custom-link ${activeLink === 'used' ? 'activee' : ''}`}
    onClick={() => setActiveLink('used')}
  >
    Used Cars
  </a>
</div>
          <select
            id="selectOption"
            value={selectBrandValue}
            onChange={handleBrandOptionChange}
            className='select-item'
          >
            {renderBrandOptions()}
          </select>
        </div>
        <div className="slider-container">
          <label htmlFor="budgetSlider" className="label-slider-item">Select Budget</label>
          <Box sx={{ width: 300 }}>
            <Slider
              value={budget}
              onChange={handleBudgetChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={1}
              max={50}
              step={1}
              marks={marks}
            />
          </Box>
          <div>Selected Budget: {budget[0]}L - {budget[1]}L</div>
        </div>
        <div>
          <select
            id="selectOptionCity"
            value={cityValue}
            onChange={handleCityChange}
            className='select-item'
          >
            {renderCityOptions()}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="search-button blue-button">Search</button>
      </form>
    </div>
      )}
    </div>
          <div>
            <div className="icons">
            <div className="user-container-hiding">
            <div className="location">
                <Link to ="/my-cars">
            <div className="location hiding-icon-for-mobile">
              <div className="location-icon">
                  <FaHeart size={24} />
              </div>
              <div className="location-text">
                <p className="navbar-heading">My Cart</p>
              </div>
            </div>
                </Link>
            </div>  
            </div>
            <div className="location">
            <div className="location" title="Location" onClick={openModal}>
                <div className="location-icon">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div className="location-text">
                  <p className="navbar-heading">Choose Location</p>
                </div>
            </div>
            </div>
            <div className="user-container-hiding">
              <div className="location">
      {userId ? (
        <>
        {/* <div className="user-container-details"> */}
          <div className="user-text">
            <p>Hello, {userName && userName.slice(0, 1).toUpperCase() + userName.slice(1,8)} </p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          {/* </div> */}
        </>
      ) : (
        <div className="location" onClick={openLoginModal}>
          <div className="location-icon" title="Profile">
            <FaUser size={24} />
          </div>
          <div className="location-text">
            <p className="navbar-heading">Profile</p>
          </div>
        </div>
      )}
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
            onChange={handleLocationSearch}
          />
        </div>
        <div className="location-container">
  <div className="location-content">
    <div className="location-list">
      {filteredStates.map((state, index) => (
        <div className="location-item" key={index} onClick={() => handleStateSelectModal(state)}>
          <span>{state.name}</span>
          <span className="location-arrow">›</span>
        </div>
      ))}
    </div>
  </div>
</div>
      </Modal>

     {/* Login Modal */}
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
      
      <div className="google-login-container">
        <h2 style={{ textAlign: 'center' }}>Login with Google</h2>
        <GoogleOAuthProvider clientId="920316076408-35gdcl6370m17toarg2qbipojrl2lqad.apps.googleusercontent.com">
          {isLoading ? (
            <div className="loader-container">
              <Oval height={40} width={40} color="#4fa94d" />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  className="google-login-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{ marginRight: '10px' }}
                  />
                  Sign in with Google
                </button>
              )}
            />
          )}
        </GoogleOAuthProvider>
      </div>
<h1 style={{ textAlign: 'center', marginBottom: '10px' }}>(or)</h1>
      <div className="modal-content">
        <h2 style={{ textAlign: 'center' }}>Login with Email</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password field with eye icon */}
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {!forgotPasswordMode && (
            <button type="submit" className="modal-button">
              Login
            </button>
          )}
        </form>

        <p style={{ marginTop: "20px", textAlign: 'center' }}>
          Don't have an account?{" "}
          <span className="modal-toggle" onClick={() => handleRegisterModalOpen()}>
            Register now
          </span>
        </p>

        {!forgotPasswordMode && (
          <p style={{ marginTop: "20px", textAlign: 'center' }}>
            Forgot password?{" "}
            <span className="modal-toggle" onClick={handleForgotPassword}>
              Click here
            </span>
          </p>
        )}

        {/* OTP Section */}
        {forgotPasswordMode && isOtpSent && (
          <div>
            <p>{otpSentMessage}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              className="modal-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="button" onClick={handleOtpVerification} className="modal-button">
              Verify OTP
            </button>

            {otpErrorMessage && <p className="error-message">{otpErrorMessage}</p>}

            {/* Resend OTP */}
            {!isOtpResendAvailable ? (
              <p>Resend OTP in 30 seconds</p>
            ) : (
              <button type="button" onClick={handleForgotPassword} className="modal-button">
                Resend OTP
              </button>
            )}

            {/* Password and Confirm Password fields */}
            {isOtpVerified && (
              <div>
                <div className="password-container">
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
                </div>

                <div className="password-container">
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
                </div>

                <button type="button" onClick={handlePasswordReset} className="modal-button">
                  Reset Password
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>

{/* Registration Modal */}
<Modal
      isOpen={registerModalIsOpen}
      onRequestClose={() => setRegisterModalIsOpen(false)}
      className="modal-register"
      overlayClassName="modal-overlay"
      contentLabel="User Register"
    >
      <button className="modal-close-button" onClick={() => setRegisterModalIsOpen(false)}>
        <IoClose />
      </button>

      <div className="google-login-container">
        <h2 style={{ textAlign: 'center' }}>Register with Google</h2>
        <GoogleOAuthProvider clientId="920316076408-35gdcl6370m17toarg2qbipojrl2lqad.apps.googleusercontent.com">
          {isLoading ? (
            <div className="loader-container">
              <Oval height={40} width={40} color="#4fa94d" />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleRegisterSuccess}
              onFailure={handleRegisterFailure}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  className="google-login-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{ marginRight: '10px' }}
                  />
                  Sign up with Google
                </button>
              )}
            />
          )}
        </GoogleOAuthProvider>
      </div>

      <div className="modal-content">
        <h2 style={{ textAlign: 'center' }}>Or Register with Email</h2>
        <form onSubmit={handleRegister}>
          <div className="email-container">
            <input
              type="email"
              placeholder="Email"
              required
              className="modal-input"
              onChange={handleEmailChange}
              disabled={isEmailVerified}
            />
            {!isEmailVerified && (
              <button
                type="button"
                className="modal-button-verify"
                onClick={handleVerifyEmail}
              >
                Verify Email
              </button>
            )}
          </div>

          {/* Message indicating OTP sent or email verified */}
          {isOtpSent && !isEmailVerified && (
            <p className="success-message">OTP sent to your email</p>
          )}
          {isEmailVerified && <p className="success-message">Email Verified</p>}

          {/* OTP Input field */}
          {isOtpSent && !isEmailVerified && (
            <div className="otp-container">
              <input
                type="text"
                placeholder="Enter OTP"
                required
                className="modal-input"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
          )}

          {/* Resend OTP button */}
          {isOtpSent && !isEmailVerified && (
            <div className="resend-otp-container">
              <p className="modal-toggle" onClick={resendOtp}>
                Resend OTP
              </p>
            </div>
          )}

          {/* Password fields appear only after OTP verification */}
          {isOtpSent && !isEmailVerified && (
            <>
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

              {/* Confirm Password field */}
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

              <button type="submit" className="modal-button">
                Register
              </button>
            </>
          )}
        </form>

        <p>
          Already have an account?{" "}
          <span
            className="modal-toggle"
            onClick={() => {
              setRegisterModalIsOpen(false);
              // Assuming there's a setLoginModalIsOpen function to open login modal
              setLoginModalIsOpen(true);
            }}
          >
            Login here
          </span>
        </p>
      </div>
    </Modal>

    </>
  );
}
