import React, { useState } from 'react';
// import { X } from "@phosphor-icons/react";
import { IoClose } from "react-icons/io5";

import './index.css';

const Index = () => {
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      {menuVisible && (
        <div className="toggle-on-screen-menu">
          <button onClick={toggleMenu} className="close-button">
          <IoClose size={20} />
          </button>
          <a href="https://api.whatsapp.com/send?phone=919597919390" target="_blank" rel="noopener noreferrer">
          <video className="telegram-icon-gif" autoPlay loop muted>
            <source src="/assets/whatsappicon.webm" type="video/webm" />
            Your browser does not support the video tag.
            </video>
          </a>
        </div>
      )}
    </>
  );
};

export default Index;
