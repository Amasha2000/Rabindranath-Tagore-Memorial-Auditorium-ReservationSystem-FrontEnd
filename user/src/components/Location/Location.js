import React from 'react';
import './Location.css';

const Location = () => {
  return (
    <div className="location-wrapper">
      <div className="location-container">
        <div className="location-info">
          <h2>Auditorium Location</h2>
          <p>University of Ruhuna</p>
          <p>Wellamadama</p>
          <p>Matara</p>
          <p><strong>Phone:</strong> (041) 2222681 Ex. 12160</p>
          <p><strong>Email:</strong> <a href="mailto:rtma.ruhuna@gmail.com">rtma.ruhuna@gmail.com</a></p>
        </div>
        
        <div className="location-map">
          <iframe
            title="University of Ruhuna Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.836058171589!2d80.58824851513335!3d5.938877295636347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae142e91507c8c9%3A0xd7a99c3b8edc119f!2sUniversity%20of%20Ruhuna!5e0!3m2!1sen!2slk!4v1631110423917!5m2!1sen!2slk"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="copyright-text">
        <p className='cr'>&copy; {new Date().getFullYear()} University of Ruhuna, Rabindranath Tagore Memorial Auditorium. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Location;
