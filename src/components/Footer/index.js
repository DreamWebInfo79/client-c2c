import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import './index.css';

export default function Component() {
  // Assuming logos are stored in the public/assets/logos directory
  const carBrands = [
    { name: 'Toyota', logo: 'car-brand/toyota.png' },
    { name: 'Honda', logo: '/car-brand/honda-rm.png' },
    { name: 'Ford', logo: '/car-brand/ford-removebg-preview.png' },
    { name: 'BMW', logo: '/car-brand/bmw-removebg-preview.png' },
    { name: 'Mercedes-Benz', logo: '/car-brand/benz-removebg-preview.png' },
    { name: 'Audi', logo: '/car-brand/audi-removebg-preview.png' },
  ];

  return (
    <>
      <div style={{ margin: "0px", padding: "0px", boxSizing: "border-box" }}>
        <footer
          id="footer"
          className="footer"
          style={{
            backgroundColor: "rgb(0, 43, 81)",
            color: "rgba(255, 255, 255, 0.7)",
            borderBottom: "1px solid rgba(224, 224, 224, 0.15)",
          }}
        >
          <div className="footer-container">
            <div className="footer-links">
              <a className="footer-link-item" href="https://www.carwale.com/about-us/" title="About Us">About Us</a>
              <a className="footer-link-item" href="https://www.carwale.com/career/" title="Careers">Careers</a>
              <a className="footer-link-item" href="https://www.carwale.com/used/sell/terms/" title="Terms & Conditions">Terms & Conditions</a>
              <a className="footer-link-item" href="https://www.carwale.com/contactus/" title="Advertise">Advertise</a>
            </div>
          </div>
          
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <p className="footer-text">Connect with us</p>
                <div className="social-links">
                  <a
                    className="social-link"
                    href="https://www.facebook.com/CarWale/"
                    rel="nofollow noopener"
                    target="_blank"
                    title="Facebook"
                  >
                    <FaFacebook className="social-icon" />
                  </a>
                  <a
                    className="social-link"
                    href="https://wa.me/yourwhatsapplink"
                    rel="nofollow noopener"
                    target="_blank"
                    title="WhatsApp"
                  >
                    <FaWhatsapp className="social-icon" />
                  </a>
                  <a
                    className="social-link"
                    href="https://twitter.com/yourtwitterlink"
                    rel="nofollow noopener"
                    target="_blank"
                    title="Twitter"
                  >
                    <FaTwitter className="social-icon" />
                  </a>
                  <a
                    className="social-link"
                    href="https://instagram.com/yourinstagramlink"
                    rel="nofollow noopener"
                    target="_blank"
                    title="Instagram"
                  >
                    <FaInstagram className="social-icon" />
                  </a>
                </div>
              </div>

              {/* Car Brands Section */}
              <div className="footer-section">
                <p className="footer-text">Top Car Brands</p>
                <div className="car-brands">
                  {carBrands.map((brand) => (
                    <div key={brand.name} className="car-brand">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="car-brand-logo"
                      />
                      <p className="car-brand-name">{brand.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-text">©CarTrade Tech.</p>
              <div className="footer-links">
                <a className="footer-link-item" href="https://www.carwale.com/visitor-agreement/" title="Visitor Agreement">Visitor Agreement</a>
                <a> & </a>
                <a className="footer-link-item" href="https://www.carwale.com/privacy-policy/" title="Privacy Policy">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
