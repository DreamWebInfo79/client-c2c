import React from 'react';
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaCar,FaEye, FaEyeSlash  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import './index.css';

const BottomNav = () => {
    
  const [isRegister, setIsRegister] = useState(false);
  
  const [password, setPassword] = useState('');
  
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');


    const openLoginModal = () => setLoginModalIsOpen(true);

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

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);



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

        </div>
    );
};

export default BottomNav;