import React from 'react';
import './NavBar.css';
import logo from '../../images/logo.png'

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
