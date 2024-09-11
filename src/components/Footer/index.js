import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import './index.css';

export default function Component() {
  const carBrands = [
    { name: 'Toyota', logo: 'car-brand/toyota.png' },
    { name: 'Honda', logo: '/car-brand/honda-rm-removebg-preview.png' },
    { name: 'Ford', logo: '/car-brand/ford-removebg-preview.png' },
    { name: 'BMW', logo: '/car-brand/bmw-removebg-preview.png' },
    { name: 'Mercedes-Benz', logo: '/car-brand/benz-removebg-preview.png' },
    { name: 'Audi', logo: '/car-brand/audi-removebg-preview.png' },
    { name: 'TATA', logo: '/car-brand/Tata-Symbol.png' },
    { name: 'Mahindra', logo: '/car-brand/f2bf43_6dde9adb83b745e7b9a0c14c4665d70d~mv2.jpg' },
  ];

  return (
    <div style={{ margin: "0px", padding: "0px", boxSizing: "border-box" }}>
      <footer id="footer" className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a className="footer-link-item" href="https://www.car2customer.com/about-us/" title="About Us">About Us</a>
            {/* <a className="footer-link-item" href="https://www.car2customer.com/career/" title="Careers">Careers</a> */}
            <a className="footer-link-item" href="https://www.car2customer.com/used/sell/terms/" title="Terms & Conditions">Terms & Conditions</a>
            <a className="footer-link-item" href="https://www.car2customer.com/contactus/" title="Advertise">Advertise</a>
          </div>

          <div className="footer-content">
            <div className="footer-section">
              <h1 className="footer-text">Connect with us!!</h1>
              <div className="social-links">
                <a
                  className="social-link"
                  href="https://www.facebook.com/Cartocustomer/"
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

            <div className="footer-section">
              <h1 className="footer-text">Top Car Brands</h1>
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
            <p className="footer-text-bottom">©C2C-Cars 2 Customers-2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
