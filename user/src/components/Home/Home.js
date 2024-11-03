import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {

    const navigate = useNavigate();

    const handleReserveNowClick = () => {
        navigate('/login');
      };

  return (
    <div className="homepage-container" id='home'>
      <div className="cover-image"></div>
        <div className="text-overlay">
          <h1 className='first-text'>UNIVERSITY OF RUHUNA</h1>
          <h2 className='second-text'><strong>RABINDRANATH TAGORE MEMORIAL AUDITORIUM</strong></h2>
          <h3 className='third-text'>LARGEST AUDITORIUM IN A SRI LANKAN UNIVERSITY</h3>
          <button className="reserve-button" onClick={handleReserveNowClick}>Reserve Now</button>
        </div>
    </div>
  );
}

export default HomePage;
