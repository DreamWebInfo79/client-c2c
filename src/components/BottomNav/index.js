import React from 'react';
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaCar,FaEye, FaEyeSlash  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect, useRef, useContext } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { CarContext } from '../CarContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {Oval} from 'react-loader-spinner'



const BottomNav = () => {
    
  const [isRegister, setIsRegister] = useState(false);
  
  const [password, setPassword] = useState('');
  
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(''); // OTP state
  const [email, setEmail] = useState('');
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [isOtpResendAvailable, setIsOtpResendAvailable] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState([1, 50]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [selectBrandValue, setSelectBrandValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [activeButton, setActiveButton] = useState('new');
  const [activeLink, setActiveLink] = useState('new');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');


    const openLoginModal = () => setLoginModalIsOpen(true);
    const handleEmailChange = (event) => setEmail(event.target.value);




    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);
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


    

    return (
        <div className="bottom-nav">
                <Link to="/">

            <div className="nav-item">
                <FaHome className="nav-icon" />
                <span>Home</span>
            </div>
                </Link>
            <Link to="/my-cars">
            <div className="nav-item language-icon">
                <FaCar  className="nav-icon" />
                <span className="span-bottom-nav">My Cars</span>
            </div>
                </Link>
            
            <div className="nav-item language-icon" title="Language" onClick={openLoginModal}>
                <FaUser className="nav-icon" />
                <span>Profile</span>
            </div>
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
        </div>
    );
};

export default BottomNav;