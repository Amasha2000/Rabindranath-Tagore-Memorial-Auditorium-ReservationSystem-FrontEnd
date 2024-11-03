import React from 'react';
import './Navbar.css';
import logo from '../../images/logo.png'

const NavbarUser = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="University Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">
          RABINDRANATH TAGORE MEMORIAL AUDITORIUM AT UNIVERSITY OF RUHUNA
        </span>
      </div>
      <div className="navbar-right">
        <a href="/" className="navbar-link">
          <span>Home</span>
        </a>
        <a href="#about-us" className="navbar-link">
          <span>About Us</span>
        </a>
        <a href="#upcoming-events" className="navbar-link">
          <span>Upcoming Events</span>
        </a>
        <a href="#past-events" className="navbar-link">
          <span>Past Events</span>
        </a>
        <a href="#contact-us" className="navbar-link">
          <span>Contact Us</span>
        </a>
      </div>
    </nav>
  );
};

export default NavbarUser;
