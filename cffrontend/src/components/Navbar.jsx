import React, { useState } from 'react';
import '../styles/Navbar.css'; // Ensure this is correct

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <a href="/" className="logo">Charity Flow</a>

      {/* Toggle Button for small screens */}
      <button className="toggle-button" onClick={toggleMenu}>
        Menu
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><a className="nav-button" href="#causes">Causes</a></li>
          <li><a className="nav-button" href="#about">About Us</a></li>
          <li><a className="nav-button" href="#contact">Contact Us</a></li>
          <li><a className="nav-button" href="#feedbacks">Feedbacks</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
